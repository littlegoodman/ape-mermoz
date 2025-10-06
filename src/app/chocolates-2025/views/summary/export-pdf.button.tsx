import { Button } from "../../../../platform/ui";
import { Eye } from "lucide-react";
import { Modal } from "../../../../platform/ui";
import { PdfPreviewModal } from "./pdf-preview.modal";

interface ExportPdfButtonProps {
  articles: any[];
  isLoading?: boolean;
}

export const ExportPdfButton = ({
  articles,
  isLoading,
}: ExportPdfButtonProps) => {
  const handlePreview = () => {
    Modal.create(PdfPreviewModal).show({
      articles,
      onClose: () => {},
    });
  };

  return (
    <Button
      color="primary"
      variant="contained"
      startIcon={<Eye size={16} />}
      onClick={handlePreview}
      disabled={isLoading || articles.length === 0}
    >
      Aperçu PDF
    </Button>
  );
};
