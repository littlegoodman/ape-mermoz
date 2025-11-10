import type { Student } from "../hooks/use-students.hook";
import { ApeMermozDatabase } from "../../../platform/databases/ape-mermoz.database";

type PersistedStudent = {
  id: number;
  first_name: string;
  last_name: string;
  class_id: number;
  class_name: string;
};

export class StudentsRepository {
  public static load(): StudentsRepository {
    return new StudentsRepository(ApeMermozDatabase.load());
  }

  constructor(private readonly db: ApeMermozDatabase) {}

  async findAll(params: { filter?: string }): Promise<Student[]> {
    let query =
      "SELECT \
        students.id, \
        students.first_name, \
        students.last_name, \
        classes.id as class_id, \
        classes.name as class_name \
      FROM students \
      INNER JOIN classes ON students.class_id = classes.id";
    if (params.filter) {
      query += ` INNER JOIN teachers ON students.class_id = teachers.class_id 
        WHERE classes.name LIKE '%${params.filter}%'
          OR students.first_name LIKE '%${params.filter}%'
          OR students.last_name LIKE '%${params.filter}%'
          OR teachers.last_name LIKE '%${params.filter}%'`;
    }
    query += " ORDER BY class_id ASC, students.last_name ASC";
    const persistence = await this.db.select<PersistedStudent[]>(query);
    return persistence.map(
      ({ id, first_name, last_name, class_id, class_name }) => ({
        id: id,
        firstName: first_name,
        lastName: last_name,
        class: { id: class_id, name: class_name },
      })
    );
  }

  async upsert(student: Student & { id?: Student["id"] }): Promise<void> {
    await this.db.execute(
      "INSERT OR REPLACE INTO students (id, first_name, last_name, class_id) VALUES (?, ?, ?, ?)",
      [student.id, student.firstName, student.lastName, student.class.id]
    );
  }

  async delete(student: Pick<Student, "id">): Promise<void> {
    await this.db.execute("DELETE FROM students WHERE id = ?", [student.id]);
  }
}
