import { Button } from "../../../../platform/ui";
import { Download } from "lucide-react";
import { useExportToPdf } from "./use-export-pdf.hook";

interface ExportPdfButtonProps {
  articles: any[];
  isLoading?: boolean;
}

export const ExportPdfButton = ({
  articles,
  isLoading,
}: ExportPdfButtonProps) => {
  const { exportToPdf, isExporting } = useExportToPdf();

  const handleExport = () => {
    exportToPdf();
  };

  return (
    <Button
      color="primary"
      variant="outlined"
      startIcon={<Download size={16} />}
      onClick={handleExport}
      loading={isExporting}
      disabled={isLoading || articles.length === 0}
      css={{
        whiteSpace: "nowrap",
      }}
    >
      Exporter en PDF
    </Button>
  );
};
