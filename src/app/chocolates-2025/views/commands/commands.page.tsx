import { Stack } from "../../../../platform/ui";
import { ScrollArea } from "../../../../platform/ui/components/scroll-area";
import { Surface } from "../../../../platform/ui/components/surface/surface";
import {
  Toolbar,
  ToolbarSlot,
} from "../../../../platform/ui/components/toolbar";
import { Page } from "../../../common/layout/page";
import { useCommands } from "../../hooks/use-commands.hook";
import { CommandsAddButton } from "./commands-add.button";
import { CommandsSearchInput } from "./commands.search-input";
import { CommandsTable } from "./commands.table";
import { useTranslation } from "react-i18next";

export const CommandsPage = () => {
  const { t } = useTranslation();
  const { findAll } = useCommands();
  const {
    data: commands,
    isLoading,
    error,
    filter,
    setFilter,
    clearFilter,
  } = findAll();

  return (
    <Page title={t("Détail des articles")}>
      <Stack>
        <Toolbar>
          <ToolbarSlot position="left">
            <CommandsSearchInput
              onSearch={setFilter}
              onClear={clearFilter}
              value={filter || ""}
              disabled={isLoading}
            />
            <ToolbarSlot position="center" />
            <ToolbarSlot position="right">
              <CommandsAddButton />
            </ToolbarSlot>
          </ToolbarSlot>
        </Toolbar>
        <ScrollArea>
          <Surface>
            <CommandsTable
              commands={commands ?? []}
              isLoading={isLoading}
              error={error}
            />
          </Surface>
        </ScrollArea>
      </Stack>
    </Page>
  );
};
