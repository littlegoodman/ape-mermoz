import { ApeMermozDatabase } from "../../../platform/databases/ape-mermoz.database";
import type { CommandsSummary, Command } from "../hooks";

type StudentPersisted = {
  id: number;
  firstName: string;
  lastName: string;
  class: string;
};

type ArticlePersisted = {
  id: number;
  name: string;
  description: string;
  price: number;
  preferential_price: number;
};

type CommandPersisted = {
  command_id: string;
  parent: string;
  student_id: number;
  article_id: number;
  quantity: number;
};

export class CommandsRepository {
  public static load(): CommandsRepository {
    return new CommandsRepository(ApeMermozDatabase.load());
  }

  constructor(private readonly db: ApeMermozDatabase) {}

  async getCommandsSummary(): Promise<CommandsSummary> {
    const commands = await this.db.select<CommandPersisted[]>(
      "SELECT * FROM commands"
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

  async findAll(params: { filter?: string }): Promise<Command[]> {
    const commands = await this.db.select<
      (CommandPersisted & StudentPersisted & ArticlePersisted)[]
    >(
      "SELECT * FROM commands INNER JOIN students ON commands.student_id = students.id INNER JOIN articles ON commands.article_id = articles.id"
    );
    return Object.values(
      commands.reduce<Record<string, Command>>((acc, command) => {
        if (!acc[command.command_id]) {
          acc[command.command_id] = {
            id: command.command_id,
            parent: command.parent,
            student: {
              id: command.student_id,
              firstName: command.firstName,
              lastName: command.lastName,
              class: command.class,
            },
            articles: [],
          };
        }
        acc[command.command_id].articles.push({
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

  async upsert(command: Command): Promise<void> {
    await Promise.all(
      command.articles.map((article) =>
        this.db.execute(
          "INSERT OR REPLACE INTO commands (command_id, parent, student_id, article_id, quantity) VALUES (?, ?, ?, ?, ?)",
          [
            command.id,
            command.parent,
            command.student.id,
            article.article.id,
            article.quantity,
          ]
        )
      )
    );
  }

  async delete(command: Command): Promise<void> {
    await this.db.execute("DELETE FROM commands WHERE command_id = ?", [
      command.id,
    ]);
  }
}
