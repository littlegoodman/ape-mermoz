import type { Teacher } from "../hooks/use-teachers.hook";
import { ApeMermozDatabase } from "../../../platform/databases/ape-mermoz.database";

type PersistedTeacher = {
  id: number;
  title: string;
  lastName: string;
  classId: number;
};

export class TeachersRepository {
  public static load(): TeachersRepository {
    return new TeachersRepository(ApeMermozDatabase.load());
  }

  constructor(private readonly db: ApeMermozDatabase) {}

  async findAll(params: { filter?: string }): Promise<Teacher[]> {
    let query =
      "SELECT teachers.id, title, last_name as lastName, classes.id as classId, classes.name as className \
      FROM teachers \
      INNER JOIN classes ON teachers.class_id = classes.id";
    if (params.filter) {
      query += ` WHERE last_name LIKE '%${params.filter}%'`;
    }
    const persistence = await this.db.select<
      (PersistedTeacher & { className: string })[]
    >(query);
    return persistence.map(({ id, title, lastName, classId, className }) => ({
      id,
      title,
      lastName,
      class: { id: classId, name: className },
    }));
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
