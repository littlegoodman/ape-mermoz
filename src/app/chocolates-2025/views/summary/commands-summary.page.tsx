import { Stack } from "../../../../platform/ui";
import { ScrollArea } from "../../../../platform/ui/components/scroll-area";
import {
  Toolbar,
  ToolbarSlot,
} from "../../../../platform/ui/components/toolbar/toolbar";
import { Page } from "../../../common/layout/page";
import { useCommands } from "../../hooks/use-commands.hook";
import { CommandArticlesGrid } from "./command-articles.grid";
import { ExportPdfButton } from "./export-pdf.button";

const HIDE = true; // TODO: remove this

export const CommandsSummaryPage = () => {
  const { getSummary } = useCommands();
  const { data: summary, isLoading, error } = getSummary();

  return (
    <Page title={"Bon de commande"}>
      <Stack>
        {!HIDE && (
          <Toolbar>
            <ToolbarSlot position="right">
              <ExportPdfButton
                articles={summary?.articles ?? []}
                isLoading={isLoading}
              />
            </ToolbarSlot>
          </Toolbar>
        )}
        <ScrollArea>
          <CommandArticlesGrid
            articles={summary?.articles ?? []}
            isLoading={isLoading}
            error={error}
          />
        </ScrollArea>
      </Stack>
    </Page>
  );
};
