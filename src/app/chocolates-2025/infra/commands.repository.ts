import { ApeMermozDatabase } from "../../../platform/databases/ape-mermoz.database";
import type {
  CommandsSummary,
  Command,
  PaymentMethod,
  Article,
} from "../hooks";
import { ArticlesRepository } from "./articles.repository";

type ArticlePersisted = {
  id: number;
  name: string;
  description: string;
  price: number;
  preferential_price: number;
  image_link?: string;
};

type TeacherPersisted = {
  teacher_id: number;
  teacher_title: string;
  teacher_last_name: string;
};

type StudentPersisted = {
  student_id: number;
  student_first_name: string;
  student_last_name: string;
};

type ClassPersisted = {
  class_id: number;
  class_name: string;
};

type CommandArticlePersisted = {
  command_id: number;
  article_id: number;
  quantity: number;
};

type CommandPersisted = {
  id: number;
  student_id: number;
  contact: string;
  phone?: string | null;
  email?: string | null;
  payment_method?: PaymentMethod | null;
  screenshot?: string | null;
};

export class CommandsRepository {
  private readonly articlesRepository: ArticlesRepository;

  public static load(): CommandsRepository {
    return new CommandsRepository(ApeMermozDatabase.load());
  }

  constructor(private readonly db: ApeMermozDatabase) {
    this.articlesRepository = new ArticlesRepository(db);
  }

  async getCommandsSummary(): Promise<CommandsSummary> {
    const articles = await this.articlesRepository.findAll();
    const commands = await this.db.select<
      (CommandArticlePersisted & Pick<CommandPersisted, "payment_method">)[]
    >(
      "SELECT commands_articles.*, commands.payment_method \
      FROM commands_articles \
      INNER JOIN commands ON commands_articles.command_id = commands.id"
    );
    const quantities = commands.reduce<Record<number, number>>(
      (acc, command) => {
        acc[command.article_id] =
          (acc[command.article_id] || 0) + command.quantity;
        return acc;
      },
      {}
    );
    const gifts = commands
      .filter((command) => command.payment_method === "gift")
      .reduce<Record<number, number>>((acc, command) => {
        acc[command.article_id] =
          (acc[command.article_id] || 0) + command.quantity;
        return acc;
      }, {});

    return {
      articles: articles.map((article) => {
        const quantity = quantities[article.id] || 0;
        const gift = gifts[article.id] || 0;
        return {
          article,
          quantity,
          gift,
          priceToGet: article.price * quantity,
          priceToPay: article.preferentialPrice * quantity,
          imageLink: article.imageLink,
        };
      }),
      totalPriceToGet: articles.reduce(
        (acc, article) => acc + article.price * (quantities[article.id] || 0),
        0
      ),
      totalPriceToPay: articles.reduce(
        (acc, article) =>
          acc + article.preferentialPrice * (quantities[article.id] || 0),
        0
      ),
    };
  }

  async findAll(params: {
    filter?: string;
    paymentMethod?: PaymentMethod;
  }): Promise<Command[]> {
    let commandsQuery =
      "SELECT \
       commands.id, \
       commands.contact, \
       commands.phone, \
       commands.email, \
       commands.payment_method, \
       teachers.id as teacher_id, \
       teachers.title as teacher_title, \
       teachers.last_name as teacher_last_name, \
       students.id as student_id, \
       students.first_name as student_first_name, \
       students.last_name as student_last_name, \
       classes.id as class_id, \
       classes.name as class_name \
      FROM commands \
      INNER JOIN teachers ON commands.teacher_id = teachers.id \
      INNER JOIN classes ON teachers.class_id = classes.id \
      LEFT JOIN students ON commands.student_id = students.id";
    if (params.filter) {
      commandsQuery += ` WHERE commands.contact LIKE '%${params.filter}%' \
          OR students.first_name LIKE '%${params.filter}%' \
          OR students.last_name LIKE '%${params.filter}%' \
          OR teachers.last_name LIKE '%${params.filter}%'
        `;
      if (params.paymentMethod) {
        commandsQuery += ` AND commands.payment_method = '${params.paymentMethod}'`;
      }
    } else if (params.paymentMethod) {
      commandsQuery += ` WHERE commands.payment_method = '${params.paymentMethod}'`;
    }
    commandsQuery +=
      " ORDER BY class_id ASC, students.last_name ASC, commands.contact ASC";
    const persistedCommands = await this.db.select<
      (CommandPersisted &
        TeacherPersisted &
        StudentPersisted &
        ClassPersisted)[]
    >(commandsQuery);

    if (persistedCommands.length === 0) {
      return [];
    }

    const commands = persistedCommands.map<Command>((command) => ({
      id: command.id,
      contact: command.contact,
      phone: command.phone,
      email: command.email,
      paymentMethod: command.payment_method,
      screenshot: command.screenshot,
      teacher: {
        id: command.teacher_id,
        title: command.teacher_title,
        lastName: command.teacher_last_name,
        class: {
          id: command.class_id,
          name: command.class_name,
        },
      },
      student: command.student_id
        ? {
            id: command.student_id,
            firstName: command.student_first_name,
            lastName: command.student_last_name,
            class: {
              id: command.class_id,
              name: command.class_name,
            },
          }
        : undefined,
      articles: [],
    }));

    const commandIds = commands.map((command) => command.id);
    const articlesQuery = `
      SELECT \
      commands_articles.command_id, \
      commands_articles.article_id, \
      commands_articles.quantity, \
      articles.name, \
      articles.description, \
      articles.price, \
      articles.preferential_price \
      FROM commands_articles \
      INNER JOIN articles ON commands_articles.article_id = articles.id \
      WHERE commands_articles.command_id IN (${commandIds.join(",")})`;

    const articles = await this.db.select<
      (CommandArticlePersisted & ArticlePersisted)[]
    >(articlesQuery);

    const articlesByCommandId = articles.reduce<
      Record<string, { article: Article; quantity: number }[]>
    >((acc, article) => {
      acc[article.command_id] = [
        ...(acc[article.command_id] || []),
        {
          article: {
            id: article.article_id,
            name: article.name,
            description: article.description,
            price: article.price,
            preferentialPrice: article.preferential_price,
          },
          quantity: article.quantity,
        },
      ];
      return acc;
    }, {});

    return commands.map((command) => ({
      ...command,
      articles: articlesByCommandId[command.id] || [],
    }));
  }

  async findOne(params: { id: string }): Promise<Command | undefined> {
    const [persistedCommand] = await this.db.select<
      (CommandPersisted &
        TeacherPersisted &
        StudentPersisted &
        ClassPersisted & { screenshot?: string | null })[]
    >(
      `SELECT \
      commands.id, \
      commands.contact, \
      commands.phone, \
      commands.email, \
      commands.payment_method, \
      commands.screenshot, \
      teachers.id as teacher_id, \
      teachers.title as teacher_title, \
      teachers.last_name as teacher_last_name, \
      students.id as student_id, \
      students.first_name as student_first_name, \
      students.last_name as student_last_name, \
      classes.id as class_id, \
      classes.name as class_name \
      FROM commands \
      LEFT JOIN students ON commands.student_id = students.id \
      INNER JOIN teachers ON commands.teacher_id = teachers.id \
      INNER JOIN classes ON teachers.class_id = classes.id \
      WHERE commands.id = ${params.id.toString()}\
    `
    );

    if (!persistedCommand) {
      return undefined;
    }

    const command: Command = {
      id: persistedCommand.id,
      contact: persistedCommand.contact,
      phone: persistedCommand.phone || null,
      email: persistedCommand.email || null,
      paymentMethod: persistedCommand.payment_method || null,
      screenshot: persistedCommand.screenshot || null,
      teacher: {
        id: persistedCommand.teacher_id,
        title: persistedCommand.teacher_title,
        lastName: persistedCommand.teacher_last_name,
        class: {
          id: persistedCommand.class_id,
          name: persistedCommand.class_name,
        },
      },
      student: persistedCommand.student_id
        ? {
            id: persistedCommand.student_id,
            firstName: persistedCommand.student_first_name,
            lastName: persistedCommand.student_last_name,
            class: {
              id: persistedCommand.class_id,
              name: persistedCommand.class_name,
            },
          }
        : undefined,
      articles: [],
    };

    const articles = await this.db.select<
      (CommandArticlePersisted & ArticlePersisted)[]
    >(
      `SELECT
      commands_articles.command_id, \
      commands_articles.article_id, \
      commands_articles.quantity, \
      articles.name, \
      articles.description, \
      articles.price, \
      articles.preferential_price \
      FROM commands_articles \
      INNER JOIN articles ON commands_articles.article_id = articles.id \
      WHERE commands_articles.command_id = ${params.id.toString()}`
    );

    command.articles = articles.map((article) => ({
      article: {
        id: article.article_id,
        name: article.name,
        description: article.description,
        price: article.price,
        preferentialPrice: article.preferential_price,
      },
      quantity: article.quantity,
    }));

    return command;
  }

  async upsert(command: Command): Promise<void> {
    const { lastInsertId } = await this.db.execute(
      "INSERT OR REPLACE INTO commands (id, happening_id, student_id, teacher_id, contact, phone, email, payment_method, screenshot) VALUES (?, (SELECT id FROM happenings WHERE name = 'Chocolats 2025'), ?, ?, ?, ?, ?, ?, ?)",
      [
        command.id,
        command.student?.id,
        command.teacher?.id,
        command.contact,
        command.phone || null,
        command.email || null,
        command.paymentMethod || null,
        command.screenshot || null,
      ]
    );
    await Promise.all(
      command.articles
        .filter((article) => article.quantity > 0)
        .map((article) =>
          this.db.execute(
            "INSERT OR REPLACE INTO commands_articles (command_id, article_id, quantity) VALUES (?, ?, ?)",
            [lastInsertId, article.article.id, article.quantity]
          )
        )
    );
  }

  async delete(command: Command): Promise<void> {
    await this.db.execute(
      "DELETE FROM commands_articles WHERE command_id = ?",
      [command.id]
    );
    await this.db.execute("DELETE FROM commands WHERE id = ?", [command.id]);
  }
}
