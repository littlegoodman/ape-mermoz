import { ApeMermozDatabase } from "../../../platform/databases/ape-mermoz.database";
import type { SchoolClass } from "../hooks/use-classes.hook";

export type PersistedClass = {
  id: number;
  name: string;
};

export class ClassesRepository {
  public static load(): ClassesRepository {
    return new ClassesRepository(ApeMermozDatabase.load());
  }

  constructor(private readonly db: ApeMermozDatabase) {}

  async findAll(): Promise<SchoolClass[]> {
    const query = "SELECT classes.id, name FROM classes";
    return this.db.select<SchoolClass[]>(query);
  }
}
