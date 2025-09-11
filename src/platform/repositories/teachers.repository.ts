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
}
