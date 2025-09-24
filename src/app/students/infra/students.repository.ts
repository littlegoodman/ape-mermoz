import type { Student } from "../hooks/use-students.hook";
import { ApeMermozDatabase } from "../../../platform/databases/ape-mermoz.database";

export class StudentsRepository {
  public static load(): StudentsRepository {
    return new StudentsRepository(ApeMermozDatabase.load());
  }

  constructor(private readonly db: ApeMermozDatabase) {}

  async findAll(params: { filter?: string }): Promise<Student[]> {
    let query =
      "SELECT id, first_name as firstName, last_name as lastName, class FROM students";
    if (params.filter) {
      query += ` WHERE first_name LIKE '%${params.filter}%' OR last_name LIKE '%${params.filter}%'`;
    }
    return this.db.select<Student[]>(query);
  }

  async upsert(student: Student & { id?: Student["id"] }): Promise<void> {
    await this.db.execute(
      "INSERT OR REPLACE INTO students (id, first_name, last_name, class) VALUES (?, ?, ?, ?)",
      [student.id, student.firstName, student.lastName, student.class]
    );
  }

  async delete(student: Pick<Student, "id">): Promise<void> {
    await this.db.execute("DELETE FROM students WHERE id = ?", [student.id]);
  }
}
