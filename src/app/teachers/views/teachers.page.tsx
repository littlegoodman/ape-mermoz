import { JSX } from "react";
import { Page } from "../../common/layout";
import { TeachersTable } from "./teachers.table";
import { AddTeacherButton } from "./teacher-creation.button";
import { TeachersSearchInput } from "./teachers.search-input";

export const TeachersPage = (): JSX.Element => {
  return (
    <Page title={"Professeurs"}>
      <TeachersSearchInput />
      <AddTeacherButton />
      <TeachersTable />
    </Page>
  );
};
