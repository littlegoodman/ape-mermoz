import { JSX } from "react";
import { ModalContainer } from "../../../../platform/ui";
import { Button } from "../../../../platform/ui";
import { Download, Eye } from "lucide-react";
import { CommandsSummary } from "../../hooks";
import { useExportToPdf } from "./use-export-pdf.hook";

interface PdfPreviewModalProps {
  articles: CommandsSummary["articles"];
  onClose: () => void;
}

export const PdfPreviewModal = ({
  articles,
  onClose,
}: PdfPreviewModalProps): JSX.Element => {
  const { exportToPdf, isExporting } = useExportToPdf();

  const handleExport = () => {
    exportToPdf(articles);
  };

  // Generate the same content as the PDF but for preview
  const generatePreviewContent = (articles: CommandsSummary["articles"]) => {
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

    const generateArticleRow = (article: CommandsSummary["articles"][0]) => (
      <tr key={article.article.id} style={{ borderBottom: "1px solid #ddd" }}>
        <td style={{ padding: "8px", fontSize: "12px" }}>
          {article.article.name}
        </td>
        <td style={{ padding: "8px", textAlign: "center", fontSize: "12px" }}>
          {article.quantity}
        </td>
        <td style={{ padding: "8px", textAlign: "center", fontSize: "12px" }}>
          {article.price.toFixed(2)} €
        </td>
        <td
          style={{
            padding: "8px",
            textAlign: "center",
            fontSize: "12px",
            color: "#059669",
          }}
        >
          {article.preferentialPrice.toFixed(2)} €
        </td>
      </tr>
    );

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

      return (
        <tr
          style={{
            backgroundColor: "#f3f4f6",
            fontWeight: "bold",
            border: "2px solid #3b82f6",
          }}
        >
          <td style={{ padding: "8px", fontSize: "13px", color: "#1e40af" }}>
            {title}
          </td>
          <td
            style={{
              padding: "8px",
              textAlign: "center",
              fontSize: "13px",
              color: "#1e40af",
            }}
          >
            {quantity}
          </td>
          <td
            style={{
              padding: "8px",
              textAlign: "center",
              fontSize: "13px",
              color: "#1e40af",
            }}
          >
            {price.toFixed(2)} €
          </td>
          <td
            style={{
              padding: "8px",
              textAlign: "center",
              fontSize: "13px",
              color: "#059669",
            }}
          >
            {preferentialPrice.toFixed(2)} €
          </td>
        </tr>
      );
    };

    return (
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          color: "#333",
          maxWidth: "800px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#1e40af",
            marginBottom: "30px",
            fontSize: "24px",
          }}
        >
          BON DE COMMANDE - CHOCOLATS 2025
        </h1>

        <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
          {/* First Column */}
          <div style={{ flex: 1 }}>
            <h3
              style={{
                color: "#1e40af",
                marginBottom: "15px",
                fontSize: "16px",
              }}
            >
              Colonne 1
            </h3>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginBottom: "20px",
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: "#f8fafc",
                    borderBottom: "2px solid #e5e7eb",
                  }}
                >
                  <th
                    style={{
                      padding: "8px",
                      textAlign: "left",
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#374151",
                    }}
                  >
                    Article
                  </th>
                  <th
                    style={{
                      padding: "8px",
                      textAlign: "center",
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#374151",
                      width: "60px",
                    }}
                  >
                    Qté
                  </th>
                  <th
                    style={{
                      padding: "8px",
                      textAlign: "center",
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#374151",
                      width: "80px",
                    }}
                  >
                    Prix
                  </th>
                  <th
                    style={{
                      padding: "8px",
                      textAlign: "center",
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#374151",
                      width: "100px",
                    }}
                  >
                    Prix préf.
                  </th>
                </tr>
              </thead>
              <tbody>{firstColumnArticles.map(generateArticleRow)}</tbody>
            </table>
            {generateColumnTotal(firstColumnArticles, "Sous-total 1")}
          </div>

          {/* Second Column */}
          <div style={{ flex: 1 }}>
            <h3
              style={{
                color: "#1e40af",
                marginBottom: "15px",
                fontSize: "16px",
              }}
            >
              Colonne 2
            </h3>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginBottom: "20px",
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: "#f8fafc",
                    borderBottom: "2px solid #e5e7eb",
                  }}
                >
                  <th
                    style={{
                      padding: "8px",
                      textAlign: "left",
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#374151",
                    }}
                  >
                    Article
                  </th>
                  <th
                    style={{
                      padding: "8px",
                      textAlign: "center",
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#374151",
                      width: "60px",
                    }}
                  >
                    Qté
                  </th>
                  <th
                    style={{
                      padding: "8px",
                      textAlign: "center",
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#374151",
                      width: "80px",
                    }}
                  >
                    Prix
                  </th>
                  <th
                    style={{
                      padding: "8px",
                      textAlign: "center",
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#374151",
                      width: "100px",
                    }}
                  >
                    Prix préf.
                  </th>
                </tr>
              </thead>
              <tbody>{secondColumnArticles.map(generateArticleRow)}</tbody>
            </table>
            {generateColumnTotal(secondColumnArticles, "Sous-total 2")}
          </div>
        </div>

        {/* Global Total */}
        <div
          style={{
            backgroundColor: "#1e40af",
            color: "white",
            padding: "15px",
            borderRadius: "6px",
            marginBottom: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 style={{ margin: 0, fontSize: "18px" }}>TOTAL GÉNÉRAL</h3>
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "14px", marginBottom: "2px" }}>
                  Articles
                </div>
                <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                  {totalQuantity}
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "14px", marginBottom: "2px" }}>
                  Prix total
                </div>
                <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                  {totalPrice.toFixed(2)} €
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "14px", marginBottom: "2px" }}>
                  Prix préférentiel
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#10b981",
                  }}
                >
                  {totalPreferentialPrice.toFixed(2)} €
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Total Benefit */}
        <div
          style={{
            backgroundColor: "#059669",
            color: "white",
            padding: "15px",
            borderRadius: "6px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 style={{ margin: 0, fontSize: "18px" }}>BÉNÉFICE TOTAL</h3>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "14px", marginBottom: "2px" }}>
                Économie réalisée
              </div>
              <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                {totalBenefit.toFixed(2)} €
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "30px",
            textAlign: "center",
            color: "#6b7280",
            fontSize: "12px",
          }}
        >
          Généré le {new Date().toLocaleDateString("fr-FR")} à{" "}
          {new Date().toLocaleTimeString("fr-FR")}
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          padding: "2rem",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
          maxWidth: "90vw",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <h2
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "20px",
            }}
          >
            <Eye size={20} />
            Aperçu du PDF
          </h2>
          <div
            style={{
              maxHeight: "60vh",
              overflowY: "auto",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "20px",
            }}
          >
            {generatePreviewContent(articles)}
          </div>
        </div>
        <div
          style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}
        >
          <Button variant="light" onClick={onClose}>
            Annuler
          </Button>
          <Button
            color="primary"
            variant="contained"
            startIcon={<Download size={16} />}
            onClick={handleExport}
            loading={isExporting}
          >
            Exporter en PDF
          </Button>
        </div>
      </div>
    </div>
  );
};
