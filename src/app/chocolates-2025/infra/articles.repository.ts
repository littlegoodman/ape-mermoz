import { ApeMermozDatabase } from "../../../platform/databases/ape-mermoz.database";
import type { Article } from "../hooks";

type ArticlePersisted = {
  id: number;
  name: string;
  description: string;
  price: number;
  preferential_price: number;
};

export class ArticlesRepository {
  public static load(): ArticlesRepository {
    return new ArticlesRepository(ApeMermozDatabase.load());
  }

  constructor(private readonly db: ApeMermozDatabase) {}

  async findAll(): Promise<Article[]> {
    const articles = await this.db.select<ArticlePersisted[]>(
      "SELECT * FROM articles"
    );
    return articles.map((article) => ({
      id: article.id,
      name: article.name,
      description: article.description,
      price: article.price,
      preferentialPrice: article.preferential_price,
    }));
  }
}
