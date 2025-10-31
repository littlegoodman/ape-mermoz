import { ApeMermozDatabase } from "../../../platform/databases/ape-mermoz.database";
import type { CommandsSummary, Command, PaymentMethod } from "../hooks";
import { ArticlePersisted } from "./articles.repository";

type TeacherPersisted = {
  teacher_id: number;
  teacher_title: string;
  teacher_last_name: string;
};

type StudentPersisted = {
  id: number;
  first_name: string;
  last_name: string;
  class_id: number;
  class_name: string;
};

type CommandArticlePersisted = {
  command_id: number;
  article_id: number;
  quantity: number;
};

type CommandPersisted = {
  id: string;
  student_id: number;
  parent: string;
  phone?: string | null;
  email?: string | null;
  payment_method?: PaymentMethod | null;
  screenshot?: string | null;
};

export class CommandsRepository {
  public static load(): CommandsRepository {
    return new CommandsRepository(ApeMermozDatabase.load());
  }

  constructor(private readonly db: ApeMermozDatabase) {}

  async getCommandsSummary(): Promise<CommandsSummary> {
    const commands = await this.db.select<CommandArticlePersisted[]>(
      "SELECT * FROM commands_articles"
    );
    const articles = await this.db.select<ArticlePersisted[]>(
      "SELECT * FROM articles"
    );
    const articlesQuantities = articles.map((article) => ({
      article: {
        id: article.id,
        name: article.name,
        description: article.description,
        price: article.price,
        preferentialPrice: article.preferential_price,
        imageLink: article.image_link,
      },
      ...commands
        .filter((command) => command.article_id === article.id)
        .reduce(
          (acc, command) => ({
            quantity: acc.quantity + command.quantity,
            price: acc.price + article.price * command.quantity,
            preferentialPrice:
              acc.preferentialPrice +
              article.preferential_price * command.quantity,
          }),
          {
            quantity: 0,
            price: 0,
            preferentialPrice: 0,
          }
        ),
    }));
    return {
      articles: articlesQuantities,
      totalPrice: articlesQuantities.reduce(
        (acc, article) => acc + article.price,
        0
      ),
      totalPreferentialPrice: articlesQuantities.reduce(
        (acc, article) => acc + article.preferentialPrice,
        0
      ),
    };
  }

  async findAll(params: {
    filter?: string;
    paymentMethod?: PaymentMethod;
  }): Promise<Command[]> {
    let query =
      "SELECT commands.id, commands.parent, commands.phone, commands.email, commands.payment_method, teachers.id as teacher_id, teachers.title as teacher_title, teachers.last_name as teacher_last_name, students.id as student_id, students.first_name as first_name, students.last_name as last_name, classes.id as class_id, classes.name as class_name, commands_articles.article_id as article_id, articles.name as name, articles.description as description, articles.price as price, articles.preferential_price as preferential_price, commands_articles.quantity as quantity FROM commands \
      INNER JOIN students ON commands.student_id = students.id \
      INNER JOIN classes ON students.class_id = classes.id \
      INNER JOIN teachers ON students.class_id = teachers.class_id \
      INNER JOIN commands_articles ON commands.id = commands_articles.command_id \
      INNER JOIN articles ON commands_articles.article_id = articles.id";
    if (params.filter) {
      query += ` WHERE commands.parent LIKE '%${params.filter}%' \
          OR students.first_name LIKE '%${params.filter}%' \
          OR students.last_name LIKE '%${params.filter}%' \
          OR commands.phone LIKE '%${params.filter}%' \
          OR commands.email LIKE '%${params.filter}%' \
        `;
      if (params.paymentMethod) {
        query += ` AND commands.payment_method = '${params.paymentMethod}'`;
      }
    } else if (params.paymentMethod) {
      query += ` WHERE commands.payment_method = '${params.paymentMethod}'`;
    }
    const commands = await this.db.select<
      (CommandPersisted &
        TeacherPersisted &
        StudentPersisted &
        CommandArticlePersisted &
        ArticlePersisted)[]
    >(query);
    return Object.values(
      commands.reduce<Record<string, Command>>((acc, command) => {
        if (!acc[command.id]) {
          acc[command.id] = {
            id: command.id,
            parent: command.parent,
            phone: command.phone || null,
            email: command.email || null,
            paymentMethod: command.payment_method || null,
            screenshot: null,
            student: {
              id: command.student_id,
              firstName: command.first_name,
              lastName: command.last_name,
              class: {
                id: command.class_id,
                name: command.class_name,
              },
            },
            teacher: {
              id: command.teacher_id,
              title: command.teacher_title,
              lastName: command.teacher_last_name,
              class: {
                id: command.class_id,
                name: command.class_name,
              },
            },
            articles: [],
          };
        }
        acc[command.id].articles.push({
          article: {
            id: command.article_id,
            name: command.name,
            description: command.description,
            price: command.price,
            preferentialPrice: command.preferential_price,
          },
          quantity: command.quantity,
        });
        return acc;
      }, {})
    );
  }

  async findOne(params: { id: string }): Promise<Command | undefined> {
    const commands = await this.db.select<
      (CommandPersisted &
        StudentPersisted &
        CommandArticlePersisted &
        ArticlePersisted)[]
    >(
      `SELECT commands.id, commands.parent, commands.phone, commands.email, commands.payment_method, commands.screenshot, students.id as student_id, students.first_name as first_name, students.last_name as last_name, classes.id as class_id, classes.name as class_name, commands_articles.article_id as article_id, articles.name as name, articles.description as description, articles.price as price, articles.preferential_price as preferential_price, commands_articles.quantity as quantity FROM commands \
      INNER JOIN students ON commands.student_id = students.id \
      INNER JOIN classes ON students.class_id = classes.id \
      INNER JOIN commands_articles ON commands.id = commands_articles.command_id \
      INNER JOIN articles ON commands_articles.article_id = articles.id \
      WHERE commands.id = ${params.id.toString()}\
    `
    );
    return commands.reduce<Command | undefined>((acc, command) => {
      if (!acc) {
        acc = {
          id: command.id,
          parent: command.parent,
          phone: command.phone,
          email: command.email,
          paymentMethod: command.payment_method,
          screenshot: command.screenshot || null,
          student: {
            id: command.student_id,
            firstName: command.first_name,
            lastName: command.last_name,
            class: {
              id: command.class_id,
              name: command.class_name,
            },
          },
          articles: [],
        };
      }
      acc.articles.push({
        article: {
          id: command.article_id,
          name: command.name,
          description: command.description,
          price: command.price,
          preferentialPrice: command.preferential_price,
        },
        quantity: command.quantity,
      });
      return acc;
    }, undefined);
  }

  async upsert(command: Command): Promise<void> {
    const { lastInsertId } = await this.db.execute(
      "INSERT OR REPLACE INTO commands (id, happening_id, student_id, parent, phone, email, payment_method, screenshot) VALUES (?, (SELECT id FROM happenings WHERE name = 'Chocolats 2025'), ?, ?, ?, ?, ?, ?)",
      [
        command.id,
        command.student.id,
        command.parent,
        command.phone || null,
        command.email || null,
        command.paymentMethod || null,
        command.screenshot || null,
      ]
    );
    await Promise.all(
      command.articles.map((article) =>
        this.db.execute(
          "INSERT OR REPLACE INTO commands_articles (command_id, article_id, quantity) VALUES (?, ?, ?)",
          [lastInsertId, article.article.id, article.quantity]
        )
      )
    ); // TODO: check if promise all is needed
  }

  async delete(command: Command): Promise<void> {
    await this.db.execute(
      "DELETE FROM commands_articles WHERE command_id = ?",
      [command.id]
    );
    await this.db.execute("DELETE FROM commands WHERE id = ?", [command.id]);
  }
}
