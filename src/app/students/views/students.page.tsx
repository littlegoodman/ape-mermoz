import { JSX } from "react";
import { Page } from "../../common/layout";
import { Stack, Row } from "../../../platform/ui/components";
import { useStudents } from "../hooks";
import { StudentAddButton } from "./student-add.button";
import { StudentsTable } from "./students.table";
import { StudentsSearchInput } from "./students.search-input";

export const StudentsPage = (): JSX.Element => {
  const { findAll } = useStudents();
  const {
    data: students,
    isLoading,
    error,
    filter,
    setFilter,
    clearFilter,
  } = findAll();

  return (
    <Page title={"Élèves"}>
      <Stack>
        <Row>
          <StudentsSearchInput
            onSearch={setFilter}
            onClear={clearFilter}
            value={filter || ""}
            disabled={isLoading}
          />
          <StudentAddButton />
        </Row>
        <StudentsTable
          students={students ?? []}
          isLoading={isLoading}
          error={error}
        />
      </Stack>
    </Page>
  );
};
