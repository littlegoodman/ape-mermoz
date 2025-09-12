import Database from "@tauri-apps/plugin-sql";

export class ApeMermozDatabase {
  private db_?: Database;

  public static load(): ApeMermozDatabase {
    return new ApeMermozDatabase();
  }

  private async db(): Promise<Database> {
    if (!this.db_) {
      this.db_ = await Database.load("sqlite:ape-mermoz.db");
    }
    return this.db_;
  }

  public async select<T>(query: string): Promise<T> {
    const db = await this.db();
    return db.select<T>(query);
  }

  public async execute(query: string, params: any[]): Promise<void> {
    const db = await this.db();
    await db.execute(query, params);
  }
}
