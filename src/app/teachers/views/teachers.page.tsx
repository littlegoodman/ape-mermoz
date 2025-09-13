import { JSX } from "react";
import { TeachersTable } from "./teachers.table";
import { AddTeacherButton } from "./teacher-creation.button";

export const TeachersPage = (): JSX.Element => {
  return (
    <>
      <AddTeacherButton />
      <TeachersTable />
    </>
  );
};
