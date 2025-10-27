import { Button } from "../../../../platform/ui";
import { Download } from "lucide-react";
import { useExportCommandsToPdf } from "./use-export-commands-pdf.hook";
import { Command } from "../../hooks/use-commands.hook";

interface CommandsExportPdfButtonProps {
  commands: Command[];
  isLoading?: boolean;
}

export const CommandsExportPdfButton = ({
  commands,
  isLoading,
}: CommandsExportPdfButtonProps) => {
  const { exportToPdf, isExporting } = useExportCommandsToPdf();

  const handleExport = () => {
    exportToPdf(commands);
  };

  return (
    <Button
      color="primary"
      variant="outlined"
      startIcon={<Download size={16} />}
      onClick={handleExport}
      loading={isExporting}
      disabled={isLoading || commands.length === 0}
      css={{
        whiteSpace: "nowrap",
      }}
    >
      Exporter en PDF
    </Button>
  );
};
