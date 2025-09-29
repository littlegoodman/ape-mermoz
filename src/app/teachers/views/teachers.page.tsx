import { JSX } from "react";
import { Page } from "../../common/layout";
import { TeachersTable } from "./teachers.table";
import { TeacherAddButton } from "./teacher-add.button";
import { TeachersSearchInput } from "./teachers.search-input";
import { Stack } from "../../../platform/ui/components";
import { useTeachers } from "../hooks";
import { Toolbar, ToolbarSlot } from "../../../platform/ui/components/toolbar";
import { ScrollArea } from "../../../platform/ui/components/scroll-area";
import { Surface } from "../../../platform/ui/components/surface/surface";

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
        <Toolbar>
          <ToolbarSlot position="left">
            <TeachersSearchInput
              onSearch={setFilter}
              onClear={clearFilter}
              value={filter || ""}
              disabled={isLoading}
            />
          </ToolbarSlot>
          <ToolbarSlot position="center" />
          <ToolbarSlot position="right">
            <TeacherAddButton />
          </ToolbarSlot>
        </Toolbar>
        <ScrollArea>
          <Surface>
            <TeachersTable
              teachers={teachers ?? []}
              isLoading={isLoading}
              error={error}
            />
          </Surface>
        </ScrollArea>
      </Stack>
    </Page>
  );
};
