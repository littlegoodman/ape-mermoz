import { Stack, Row } from "../../../../platform/ui";
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
    <Page title={t("Commandes")}>
      <Stack>
        <Row>
          <CommandsSearchInput
            onSearch={setFilter}
            onClear={clearFilter}
            value={filter || ""}
            disabled={isLoading}
          />
          <CommandsAddButton />
        </Row>
      </Stack>
      <CommandsTable
        commands={commands ?? []}
        isLoading={isLoading}
        error={error}
      />
    </Page>
  );
};
