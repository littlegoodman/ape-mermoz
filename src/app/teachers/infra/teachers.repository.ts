import type { Teacher } from "../hooks/use-teachers.hook";
import { ApeMermozDatabase } from "../../../platform/databases/ape-mermoz.database";

export class TeachersRepository {
  public static load(): TeachersRepository {
    return new TeachersRepository(ApeMermozDatabase.load());
  }

  constructor(private readonly db: ApeMermozDatabase) {}

  async findAll(params: { filter?: string }): Promise<Teacher[]> {
    let query =
      "SELECT teachers.id, first_name as firstName, last_name as lastName, classes.name as class \
      FROM teachers \
      INNER JOIN classes ON teachers.class_id = classes.id";
    if (params.filter) {
      query += ` WHERE first_name LIKE '%${params.filter}%' OR last_name LIKE '%${params.filter}%'`;
    }
    return this.db.select<Teacher[]>(query);
  }

  async upsert(teacher: Teacher & { id?: Teacher["id"] }): Promise<void> {
    await this.db.execute(
      "INSERT OR REPLACE INTO teachers (id, first_name, last_name, class_id) VALUES (?, ?, ?, (SELECT id FROM classes WHERE name = ?))",
      [teacher.id, teacher.firstName, teacher.lastName, teacher.class]
    );
  }

  async delete(teacher: Pick<Teacher, "id">): Promise<void> {
    await this.db.execute("DELETE FROM teachers WHERE id = ?", [teacher.id]);
  }
}
