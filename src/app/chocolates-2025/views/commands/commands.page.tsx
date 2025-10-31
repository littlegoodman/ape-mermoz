import { Stack, Text, Row } from "../../../../platform/ui";
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
import { CommandsExportPdfButton } from "./commands-export-pdf.button";
import { useTranslation } from "react-i18next";
import { CommandsPaymentMethodToggle } from "./commands.payment-method.toggle";

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
    params,
    setParam,
  } = findAll();

  return (
    <Page title={t("Détail des articles")}>
      <Stack>
        <Toolbar>
          <ToolbarSlot position="left">
            <Row spacing={2} align="center">
              <CommandsSearchInput
                onSearch={setFilter}
                onClear={clearFilter}
                value={filter || ""}
                disabled={isLoading}
              />
              <CommandsPaymentMethodToggle
                value={params.paymentMethod as any}
                onChange={(value) => setParam("paymentMethod", value)}
                disabled={isLoading}
              />
            </Row>
          </ToolbarSlot>
          <ToolbarSlot position="center">
            <Row spacing={4} align="center">
              <Text variant="subtitle" noWrap>
                {commands?.length ?? 0}{" "}
                {(commands?.length ?? 0) < 2 ? t("commande") : t("commandes")}
              </Text>
            </Row>
          </ToolbarSlot>
          <ToolbarSlot position="right">
            <CommandsAddButton />
            <CommandsExportPdfButton
              commands={commands ?? []}
              isLoading={isLoading}
            />
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
