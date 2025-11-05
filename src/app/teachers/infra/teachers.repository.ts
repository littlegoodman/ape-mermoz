import type { Teacher } from "../hooks/use-teachers.hook";
import { ApeMermozDatabase } from "../../../platform/databases/ape-mermoz.database";

type PersistedTeacher = {
  id: number;
  title: string;
  last_name: string;
  class_id: number;
  class_name: string;
};

export class TeachersRepository {
  public static load(): TeachersRepository {
    return new TeachersRepository(ApeMermozDatabase.load());
  }

  constructor(private readonly db: ApeMermozDatabase) {}

  async findAll(params: { filter?: string }): Promise<Teacher[]> {
    let query =
      "SELECT \
        teachers.id, \
        title, \
        last_name, \
        classes.id as class_id, \
        classes.name as class_name \
      FROM teachers \
      INNER JOIN classes ON teachers.class_id = classes.id \
      ORDER BY class_id ASC";
    if (params.filter) {
      query += ` WHERE last_name LIKE '%${params.filter}%'`;
    }
    const persistence = await this.db.select<PersistedTeacher[]>(query);
    return persistence.map(
      ({ id, title, last_name, class_id, class_name }) => ({
        id,
        title,
        lastName: last_name,
        class: { id: class_id, name: class_name },
      })
    );
  }

  async upsert(teacher: Teacher & { id?: Teacher["id"] }): Promise<void> {
    await this.db.execute(
      "INSERT OR REPLACE INTO teachers (id, title, last_name, class_id) VALUES (?, ?, ?, ?)",
      [teacher.id, teacher.title, teacher.lastName, teacher.class.id]
    );
  }

  async delete(teacher: Pick<Teacher, "id">): Promise<void> {
    await this.db.execute("DELETE FROM teachers WHERE id = ?", [teacher.id]);
  }
}
