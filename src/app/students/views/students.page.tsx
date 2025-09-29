import { JSX } from "react";
import { Page } from "../../common/layout";
import { Stack, Row } from "../../../platform/ui/components";
import { useStudents } from "../hooks";
import { StudentAddButton } from "./student-add.button";
import { StudentsTable } from "./students.table";
import { StudentsSearchInput } from "./students.search-input";
import { Toolbar, ToolbarSlot } from "../../../platform/ui/components/toolbar";
import { Surface } from "../../../platform/ui/components/surface/surface";
import { ScrollArea } from "../../../platform/ui/components/scroll-area";

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
        <Toolbar>
          <ToolbarSlot position="left">
            <StudentsSearchInput
              onSearch={setFilter}
              onClear={clearFilter}
              value={filter || ""}
              disabled={isLoading}
            />
          </ToolbarSlot>
          <ToolbarSlot position="center" />
          <ToolbarSlot position="right">
            <StudentAddButton />
          </ToolbarSlot>
        </Toolbar>
        <ScrollArea>
          <Surface>
            <StudentsTable
              students={students ?? []}
              isLoading={isLoading}
              error={error}
            />
          </Surface>
        </ScrollArea>
      </Stack>
    </Page>
  );
};
