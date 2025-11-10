import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import bonDeCommandeTemplate from "../../../../assets/templates/bon-de-commande-association.pdf?url";

export const useExportToPdf = () => {
  const [isExporting, setIsExporting] = useState(false);

  const exportToPdf = async () => {
    setIsExporting(true);

    try {
      // Fetch the PDF template
      const templateBytes = await fetch(bonDeCommandeTemplate).then((res) =>
        res.arrayBuffer()
      );

      // Load the PDF document
      const pdfDoc = await PDFDocument.load(templateBytes);

      // Save and download the PDF
      const pdfBytes = await pdfDoc.save();
      const arrayCopy = new Uint8Array(pdfBytes.byteLength);
      arrayCopy.set(pdfBytes);
      const blob = new Blob([arrayCopy], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `bon-de-commande-${
        new Date().toISOString().split("T")[0]
      }.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Erreur lors de la génération du PDF");
    } finally {
      setIsExporting(false);
    }
  };

  return { exportToPdf, isExporting };
};
