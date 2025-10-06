import { Page } from "../../../common/layout/page";
import { useCommands } from "../../hooks/use-commands.hook";
import { CommandArticlesGrid } from "./command-articles.grid";
import { ExportPdfButton } from "./export-pdf.button";

export const CommandsSummaryPage = () => {
  const { getSummary } = useCommands();
  const { data: summary, isLoading, error } = getSummary();

  return (
    <Page title={"Bon de commande"}>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <ExportPdfButton
          articles={summary?.articles ?? []}
          isLoading={isLoading}
        />
      </div>
      <CommandArticlesGrid
        articles={summary?.articles ?? []}
        isLoading={isLoading}
        error={error}
      />
    </Page>
  );
};
