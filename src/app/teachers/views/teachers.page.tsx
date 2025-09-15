import { JSX } from "react";
import { Page } from "../../common/layout";
import { TeachersTable } from "./teachers.table";
import { TeacherAddButton } from "./teacher-add.button";
import { TeachersSearchInput } from "./teachers.search-input";
import { Stack, Row } from "../../../platform/ui/components";

export const TeachersPage = (): JSX.Element => {
  return (
    <Page title={"Professeurs"}>
      <Stack>
        <Row>
          <TeachersSearchInput />
          <TeacherAddButton />
        </Row>
        <TeachersTable />
      </Stack>
    </Page>
  );
};
