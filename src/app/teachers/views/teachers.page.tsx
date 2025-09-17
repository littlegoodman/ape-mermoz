import { JSX } from "react";
import { Page } from "../../common/layout";
import { TeachersTable } from "./teachers.table";
import { TeacherAddButton } from "./teacher-add.button";
import { TeachersSearchInput } from "./teachers.search-input";
import { Stack, Row } from "../../../platform/ui/components";
import { useTeachers } from "../hooks";

export const TeachersPage = (): JSX.Element => {
  const { findAll } = useTeachers();
  const {
    data: teachers,
    isLoading,
    error,
    filter,
    setFilter,
    clearFilter,
  } = findAll();

  return (
    <Page title={"Enseignants"}>
      <Stack>
        <Row>
          <TeachersSearchInput
            onSearch={setFilter}
            onClear={clearFilter}
            value={filter || ""}
            disabled={isLoading}
          />
          <TeacherAddButton />
        </Row>
        <TeachersTable
          teachers={teachers ?? []}
          isLoading={isLoading}
          error={error}
        />
      </Stack>
    </Page>
  );
};
