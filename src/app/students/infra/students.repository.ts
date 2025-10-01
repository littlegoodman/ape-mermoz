import type { Student } from "../hooks/use-students.hook";
import { ApeMermozDatabase } from "../../../platform/databases/ape-mermoz.database";

type PersistedStudent = {
  id: number;
  firstName: string;
  lastName: string;
  classId: number;
};

export class StudentsRepository {
  public static load(): StudentsRepository {
    return new StudentsRepository(ApeMermozDatabase.load());
  }

  constructor(private readonly db: ApeMermozDatabase) {}

  async findAll(params: { filter?: string }): Promise<Student[]> {
    let query =
      "SELECT students.id, students.first_name as firstName, students.last_name as lastName, classes.id as classId, classes.name as className \
      FROM students \
      INNER JOIN classes ON students.class_id = classes.id";
    if (params.filter) {
      query += ` INNER JOIN teachers ON students.class_id = teachers.class_id 
        WHERE classes.name LIKE '%${params.filter}%'
          OR students.first_name LIKE '%${params.filter}%'
          OR students.last_name LIKE '%${params.filter}%'
          OR teachers.last_name LIKE '%${params.filter}%'`;
    }
    const persistence = await this.db.select<
      (PersistedStudent & { className: string })[]
    >(query);
    return persistence.map(
      ({ id, firstName, lastName, classId, className }) => ({
        id: id,
        firstName,
        lastName,
        class: { id: classId, name: className },
      })
    );
  }

  async upsert(student: Student & { id?: Student["id"] }): Promise<void> {
    await this.db.execute(
      "INSERT OR REPLACE INTO students (id, first_name, last_name, class_id) VALUES (?, ?, ?, (SELECT id FROM classes WHERE name = ?))",
      [student.id, student.firstName, student.lastName, student.class.id]
    );
  }

  async delete(student: Pick<Student, "id">): Promise<void> {
    await this.db.execute("DELETE FROM students WHERE id = ?", [student.id]);
  }
}
