import type { Teacher } from "../../app/teachers/hooks/use-teachers.hook";
import { ApeMermozDatabase } from "./db";

export class TeachersRepository {
  public static load(): TeachersRepository {
    return new TeachersRepository(ApeMermozDatabase.load());
  }

  constructor(private readonly db: ApeMermozDatabase) {}

  async findAll(params: { filter?: string }): Promise<Teacher[]> {
    let query = "SELECT * FROM teachers";
    if (params.filter) {
      query += ` WHERE firstName LIKE '%${params.filter}%' OR lastName LIKE '%${params.filter}%'`;
    }
    return this.db.select<Teacher[]>(query);
  }

  async upsert(teacher: Teacher & { id?: Teacher["id"] }): Promise<void> {
    await this.db.execute(
      "INSERT OR REPLACE INTO teachers (id, firstName, lastName, class) VALUES (?, ?, ?, ?)",
      [teacher.id, teacher.firstName, teacher.lastName, teacher.class]
    );
  }

  async delete(teacher: Pick<Teacher, "id">): Promise<void> {
    await this.db.execute("DELETE FROM teachers WHERE id = ?", [teacher.id]);
  }
}
