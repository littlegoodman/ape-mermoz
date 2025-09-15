import type { Teacher } from "../../app/teachers/hooks/use-teachers.hook";
import { ApeMermozDatabase } from "./db";

export class TeachersRepository {
  public static load(): TeachersRepository {
    return new TeachersRepository(ApeMermozDatabase.load());
  }

  constructor(private readonly db: ApeMermozDatabase) {}

  async findAll(): Promise<Teacher[]> {
    return this.db.select<Teacher[]>("SELECT * FROM teachers");
  }

  async findById(id: string): Promise<Teacher> {
    return this.db.select<Teacher>(`SELECT * FROM teachers WHERE id = ${id}`);
  }

  async create(teacher: Omit<Teacher, "id">): Promise<void> {
    await this.db.execute("INSERT INTO teachers (name, phone) VALUES (?, ?)", [
      teacher.name,
      teacher.phone,
    ]);
  }

  async delete(teacher: Pick<Teacher, "id">): Promise<void> {
    await this.db.execute("DELETE FROM teachers WHERE id = ?", [teacher.id]);
  }
}
