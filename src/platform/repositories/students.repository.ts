import type { Student } from "../../app/students/hooks/use-students.hook";
import { ApeMermozDatabase } from "./db";

export class StudentsRepository {
  public static load(): StudentsRepository {
    return new StudentsRepository(ApeMermozDatabase.load());
  }

  constructor(private readonly db: ApeMermozDatabase) {}

  async findAll(params: { filter?: string }): Promise<Student[]> {
    let query = "SELECT * FROM students";
    if (params.filter) {
      query += ` WHERE firstName LIKE '%${params.filter}%' OR lastName LIKE '%${params.filter}%'`;
    }
    return this.db.select<Student[]>(query);
  }

  async upsert(student: Student & { id?: Student["id"] }): Promise<void> {
    await this.db.execute(
      "INSERT OR REPLACE INTO students (id, firstName, lastName, class) VALUES (?, ?, ?, ?)",
      [student.id, student.firstName, student.lastName, student.class]
    );
  }

  async delete(student: Pick<Student, "id">): Promise<void> {
    await this.db.execute("DELETE FROM students WHERE id = ?", [student.id]);
  }
}
