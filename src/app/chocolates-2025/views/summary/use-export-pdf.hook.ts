import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { CommandsSummary } from "../../hooks";

export const useExportToPdf = () => {
  const [isExporting, setIsExporting] = useState(false);

  const exportToPdf = async (articles: CommandsSummary["articles"]) => {
    setIsExporting(true);

    try {
      // Create a temporary container for the PDF content
      const tempContainer = document.createElement("div");
      tempContainer.style.position = "absolute";
      tempContainer.style.left = "-9999px";
      tempContainer.style.top = "-9999px";
      tempContainer.style.width = "800px";
      tempContainer.style.backgroundColor = "white";
      tempContainer.style.padding = "20px";
      tempContainer.style.fontFamily = "Arial, sans-serif";

      document.body.appendChild(tempContainer);

      // Generate the PDF content HTML
      const pdfContent = generatePdfContent(articles);
      tempContainer.innerHTML = pdfContent;

      // Convert to canvas and then to PDF
      const canvas = await html2canvas(tempContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Clean up
      document.body.removeChild(tempContainer);

      // Download the PDF
      const fileName = `bon-de-commande-${
        new Date().toISOString().split("T")[0]
      }.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Erreur lors de la génération du PDF");
    } finally {
      setIsExporting(false);
    }
  };

  return { exportToPdf, isExporting };
};

const generatePdfContent = (articles: CommandsSummary["articles"]) => {
  // Calculate totals
  const totalQuantity = articles.reduce(
    (sum, article) => sum + article.quantity,
    0
  );
  const totalPrice = articles.reduce((sum, article) => sum + article.price, 0);
  const totalPreferentialPrice = articles.reduce(
    (sum, article) => sum + article.preferentialPrice,
    0
  );
  const totalBenefit = totalPrice - totalPreferentialPrice;

  // Split articles into two columns
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

  const generateArticleRow = (article: CommandsSummary["articles"][0]) => `
    <tr style="border-bottom: 1px solid #ddd;">
      <td style="padding: 8px; font-size: 12px;">${article.article.name}</td>
      <td style="padding: 8px; text-align: center; font-size: 12px;">${
        article.quantity
      }</td>
      <td style="padding: 8px; text-align: center; font-size: 12px;">${article.price.toFixed(
        2
      )} €</td>
      <td style="padding: 8px; text-align: center; font-size: 12px; color: #059669;">${article.preferentialPrice.toFixed(
        2
      )} €</td>
    </tr>
  `;

  const generateColumnTotal = (
    columnArticles: CommandsSummary["articles"],
    title: string
  ) => {
    const quantity = columnArticles.reduce(
      (sum, article) => sum + article.quantity,
      0
    );
    const price = columnArticles.reduce(
      (sum, article) => sum + article.price,
      0
    );
    const preferentialPrice = columnArticles.reduce(
      (sum, article) => sum + article.preferentialPrice,
      0
    );

    return `
      <tr style="background-color: #f3f4f6; font-weight: bold; border: 2px solid #3b82f6;">
        <td style="padding: 8px; font-size: 13px; color: #1e40af;">${title}</td>
        <td style="padding: 8px; text-align: center; font-size: 13px; color: #1e40af;">${quantity}</td>
        <td style="padding: 8px; text-align: center; font-size: 13px; color: #1e40af;">${price.toFixed(
          2
        )} €</td>
        <td style="padding: 8px; text-align: center; font-size: 13px; color: #059669;">${preferentialPrice.toFixed(
          2
        )} €</td>
      </tr>
    `;
  };

  return `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h1 style="text-align: center; color: #1e40af; margin-bottom: 30px; font-size: 24px;">
        BON DE COMMANDE - CHOCOLATS 2025
      </h1>
      
      <div style="display: flex; gap: 20px; margin-bottom: 30px;">
        <!-- First Column -->
        <div style="flex: 1;">
          <h3 style="color: #1e40af; margin-bottom: 15px; font-size: 16px;">Colonne 1</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="background-color: #f8fafc; border-bottom: 2px solid #e5e7eb;">
                <th style="padding: 8px; text-align: left; font-size: 12px; font-weight: bold; color: #374151;">Article</th>
                <th style="padding: 8px; text-align: center; font-size: 12px; font-weight: bold; color: #374151; width: 60px;">Qté</th>
                <th style="padding: 8px; text-align: center; font-size: 12px; font-weight: bold; color: #374151; width: 80px;">Prix</th>
                <th style="padding: 8px; text-align: center; font-size: 12px; font-weight: bold; color: #374151; width: 100px;">Prix préf.</th>
              </tr>
            </thead>
            <tbody>
              ${firstColumnArticles.map(generateArticleRow).join("")}
            </tbody>
          </table>
          ${generateColumnTotal(firstColumnArticles, "Sous-total")}
        </div>

        <!-- Second Column -->
        <div style="flex: 1;">
          <h3 style="color: #1e40af; margin-bottom: 15px; font-size: 16px;">Colonne 2</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="background-color: #f8fafc; border-bottom: 2px solid #e5e7eb;">
                <th style="padding: 8px; text-align: left; font-size: 12px; font-weight: bold; color: #374151;">Article</th>
                <th style="padding: 8px; text-align: center; font-size: 12px; font-weight: bold; color: #374151; width: 60px;">Qté</th>
                <th style="padding: 8px; text-align: center; font-size: 12px; font-weight: bold; color: #374151; width: 80px;">Prix</th>
                <th style="padding: 8px; text-align: center; font-size: 12px; font-weight: bold; color: #374151; width: 100px;">Prix préf.</th>
              </tr>
            </thead>
            <tbody>
              ${secondColumnArticles.map(generateArticleRow).join("")}
            </tbody>
          </table>
          ${generateColumnTotal(secondColumnArticles, "Sous-total")}
        </div>
      </div>

      <!-- Global Total -->
      <div style="background-color: #1e40af; color: white; padding: 15px; border-radius: 6px; margin-bottom: 15px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h3 style="margin: 0; font-size: 18px;">TOTAL GÉNÉRAL</h3>
          <div style="display: flex; gap: 20px; align-items: center;">
            <div style="text-align: center;">
              <div style="font-size: 14px; margin-bottom: 2px;">Quantité</div>
              <div style="font-size: 18px; font-weight: bold;">${totalQuantity}</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 14px; margin-bottom: 2px;">Prix total</div>
              <div style="font-size: 18px; font-weight: bold;">${totalPrice.toFixed(
                2
              )} €</div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 14px; margin-bottom: 2px;">Prix préférentiel</div>
              <div style="font-size: 18px; font-weight: bold; color: #10b981;">${totalPreferentialPrice.toFixed(
                2
              )} €</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Total Benefit -->
      <div style="background-color: #059669; color: white; padding: 15px; border-radius: 6px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h3 style="margin: 0; font-size: 18px;">BÉNÉFICE TOTAL</h3>
          <div style="text-align: center;">
            <div style="font-size: 14px; margin-bottom: 2px;">Économie réalisée</div>
            <div style="font-size: 18px; font-weight: bold;">${totalBenefit.toFixed(
              2
            )} €</div>
          </div>
        </div>
      </div>

      <div style="margin-top: 30px; text-align: center; color: #6b7280; font-size: 12px;">
        Généré le ${new Date().toLocaleDateString(
          "fr-FR"
        )} à ${new Date().toLocaleTimeString("fr-FR")}
      </div>
    </div>
  `;
};
