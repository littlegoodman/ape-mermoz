import { Page } from "../../../common/layout/page";
import { useCommands } from "../../hooks/use-commands.hook";
import { CommandArticlesGrid } from "./command-articles.grid";

export const CommandsSummaryPage = () => {
  const { getSummary } = useCommands();
  const { data: summary, isLoading, error } = getSummary();

  return (
    <Page title={"Bon de commande"}>
      <CommandArticlesGrid
        articles={summary?.articles ?? []}
        isLoading={isLoading}
        error={error}
      />
    </Page>
  );
};
