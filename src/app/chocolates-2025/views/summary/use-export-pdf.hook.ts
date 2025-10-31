import { useState } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { CommandsSummary } from "../../hooks";
import bonDeCommandeTemplate from "../../../../assets/templates/bon-de-commande-association.pdf?url";

export const useExportToPdf = () => {
  const [isExporting, setIsExporting] = useState(false);

  const exportToPdf = async (articles: CommandsSummary["articles"]) => {
    setIsExporting(true);

    try {
      // Fetch the PDF template
      const templateBytes = await fetch(bonDeCommandeTemplate).then((res) =>
        res.arrayBuffer()
      );

      // Load the PDF document
      const pdfDoc = await PDFDocument.load(templateBytes);

      // Get form fields (if the PDF has an interactive form)
      const form = pdfDoc.getForm();

      // Organize articles into columns
      const ARTICLES_FIRST_COLUMN = [
        "Le ballotin 250 g net",
        "Le ballotin 500 g net",
        "Le ballotin 1 kg net",
        "Le ballotin 500 g net (au lait)",
        "Le ballotin 500 g net (noirs)",
        "Le ballotin 500 g net (blancs)",
        "La boite Palets 250g net",
        "La boite Rochers 250g net",
        "La boite Manons 240g net",
        "La boite Truffes 350g net",
        "La boite Carrés 252 g net",
        "La boite en métal Giandujas 260g net",
        "La boite bombes de chocolat chaud 200g net",
        "Le sachet de 8 ours en chocolat 96g net",
      ];

      const ARTICLES_SECOND_COLUMN = [
        'La boite "Choco\'pralinés" 280g net',
        "La boite sujets de Noël 245g net",
        "La boite ours en guimauve 375g net",
        "La boite ours en guimauve caramel 320 g net",
        "La boule de Noël en métal 64g net",
        "Le coffret métal 330g net",
        "La boite Gustaves 325g net",
        "La boite Juliettes 285g net",
        "Amandes et noisettes au chocolat 230 g net",
        "Les orangettes 260g net",
        "Les pâtes de fruits 250g net",
        "Les marrons glacés en morceaux 250g net",
        "Le sac (24 x 28 x 11 cm)",
      ];

      const firstColumnArticles = articles.filter((article) =>
        ARTICLES_FIRST_COLUMN.includes(article.article.name)
      );
      const secondColumnArticles = articles.filter((article) =>
        ARTICLES_SECOND_COLUMN.includes(article.article.name)
      );

      // Try to find and fill form fields
      const fields = form.getFields();

      // If PDF has form fields, try to fill them
      if (fields.length > 0) {
        // Get field names
        const fieldNames = fields.map((f) => f.getName());
        console.log("PDF form fields found:", fieldNames);

        // Try to populate form fields if they exist
        fields.forEach((field) => {
          try {
            const fieldName = field.getName();

            // Try to match field names and fill them
            // Example: You might have fields like "article1_name", "article1_quantity", etc.
            // This needs to be customized based on your actual PDF form field names

            // For text fields
            if (field.constructor.name === "PDFTextField") {
              const textField = form.getTextField(fieldName);
              // You can set text based on field name patterns
              // This is a placeholder - adjust based on your actual PDF structure
            }
          } catch (error) {
            console.error(`Error filling field ${field.getName()}:`, error);
          }
        });
      }

      // Get the first page to potentially draw text on it
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];

      // Calculate totals
      const totalQuantity = articles.reduce(
        (sum, article) => sum + article.quantity,
        0
      );
      const totalPrice = articles.reduce(
        (sum, article) => sum + article.price,
        0
      );
      const totalPreferentialPrice = articles.reduce(
        (sum, article) => sum + article.preferentialPrice,
        0
      );
      const totalBenefit = totalPrice - totalPreferentialPrice;

      // Save and download the PDF
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
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
