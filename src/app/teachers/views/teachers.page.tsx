import { JSX } from "react";
import { TeachersTable } from "./teachers.table";
import { AddTeacherButton } from "./teacher-creation.button";
import { Page } from "../../common/layout";

export const TeachersPage = (): JSX.Element => {
  return (
    <Page title={"Professeurs"}>
      <AddTeacherButton />
      <TeachersTable />
    </Page>
  );
};
