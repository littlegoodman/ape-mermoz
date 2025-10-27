import { JSX } from "react";
import { CommandsSummary } from "../../hooks";
import { Empty } from "../../../../platform/ui";
import {
  ArticlesGrid,
  ARTICLES_FIRST_COLUMN,
  ARTICLES_SECOND_COLUMN,
} from "../shared/articles-grid";

const GlobalTotal = ({
  firstColumnArticles,
  secondColumnArticles,
}: {
  firstColumnArticles: CommandsSummary["articles"];
  secondColumnArticles: CommandsSummary["articles"];
}) => {
  const totalQuantity =
    firstColumnArticles.reduce((sum, article) => sum + article.quantity, 0) +
    secondColumnArticles.reduce((sum, article) => sum + article.quantity, 0);

  const totalPrice =
    firstColumnArticles.reduce((sum, article) => sum + article.price, 0) +
    secondColumnArticles.reduce((sum, article) => sum + article.price, 0);

  const totalPreferentialPrice =
    firstColumnArticles.reduce(
      (sum, article) => sum + article.preferentialPrice,
      0
    ) +
    secondColumnArticles.reduce(
      (sum, article) => sum + article.preferentialPrice,
      0
    );

  return (
    <div
      style={{
        border: "2px solid #1d4ed8",
        borderRadius: "4px",
        marginTop: "12px",
        backgroundColor: "#1e40af",
        height: "60px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        fontWeight: "700",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          gap: "8px",
        }}
      >
        <div style={{ flex: 1 }}>
          <h3
            style={{
              margin: "0",
              fontSize: "16px",
              fontWeight: "700",
              color: "white",
            }}
          >
            TOTAL GÉNÉRAL
          </h3>
        </div>
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <div
            style={{ textAlign: "center", minWidth: "35px", flex: "0 0 35px" }}
          >
            <div
              style={{
                fontSize: "14px",
                fontWeight: "700",
                color: "white",
              }}
            >
              {totalQuantity}
            </div>
          </div>
          <div
            style={{ textAlign: "center", minWidth: "45px", flex: "0 0 45px" }}
          >
            <div
              style={{
                fontSize: "14px",
                fontWeight: "700",
                color: "white",
              }}
            >
              {totalPrice.toFixed(2)} €
            </div>
          </div>
          <div
            style={{ textAlign: "center", minWidth: "55px", flex: "0 0 55px" }}
          >
            <div
              style={{
                fontSize: "14px",
                fontWeight: "700",
                color: "#10b981",
              }}
            >
              {totalPreferentialPrice.toFixed(2)} €
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TotalBenefit = ({
  firstColumnArticles,
  secondColumnArticles,
}: {
  firstColumnArticles: CommandsSummary["articles"];
  secondColumnArticles: CommandsSummary["articles"];
}) => {
  const totalPrice =
    firstColumnArticles.reduce((sum, article) => sum + article.price, 0) +
    secondColumnArticles.reduce((sum, article) => sum + article.price, 0);

  const totalPreferentialPrice =
    firstColumnArticles.reduce(
      (sum, article) => sum + article.preferentialPrice,
      0
    ) +
    secondColumnArticles.reduce(
      (sum, article) => sum + article.preferentialPrice,
      0
    );

  const totalBenefit = totalPrice - totalPreferentialPrice;

  return (
    <div
      style={{
        border: "2px solid #059669",
        borderRadius: "4px",
        marginTop: "8px",
        backgroundColor: "#059669",
        height: "60px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        fontWeight: "700",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          gap: "8px",
        }}
      >
        <div style={{ flex: 1 }}>
          <h3
            style={{
              margin: "0",
              fontSize: "16px",
              fontWeight: "700",
              color: "white",
            }}
          >
            BÉNÉFICE TOTAL
          </h3>
        </div>
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <div
            style={{ textAlign: "center", minWidth: "35px", flex: "0 0 35px" }}
          >
            <div
              style={{
                fontSize: "14px",
                fontWeight: "700",
                color: "white",
              }}
            >
              -
            </div>
          </div>
          <div
            style={{ textAlign: "center", minWidth: "45px", flex: "0 0 45px" }}
          >
            <div
              style={{
                fontSize: "14px",
                fontWeight: "700",
                color: "white",
              }}
            >
              -
            </div>
          </div>
          <div
            style={{ textAlign: "center", minWidth: "55px", flex: "0 0 55px" }}
          >
            <div
              style={{
                fontSize: "14px",
                fontWeight: "700",
                color: "white",
              }}
            >
              {totalBenefit.toFixed(2)} €
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CommandArticlesGridProps {
  articles: CommandsSummary["articles"];
  isLoading: boolean;
  error: Error | null;
}

export const CommandArticlesGrid = ({
  articles,
  isLoading,
  error,
}: CommandArticlesGridProps): JSX.Element => {
  if (isLoading) {
    return <Empty title="Chargement..." />;
  }

  if (error) {
    return <Empty title="Erreur" subtitle={error.message} />;
  }

  if (articles.length === 0) {
    return <Empty title="Aucune commande trouvée" />;
  }

  // Transform articles data for the shared component
  const allArticles = articles.map((item) => item.article);
  const quantities = articles.reduce((acc, item) => {
    acc[item.article.id] = item.quantity;
    return acc;
  }, {} as Record<number, number>);
  const prices = articles.reduce((acc, item) => {
    acc[item.article.id] = item.price;
    return acc;
  }, {} as Record<number, number>);
  const preferentialPrices = articles.reduce((acc, item) => {
    acc[item.article.id] = item.preferentialPrice;
    return acc;
  }, {} as Record<number, number>);

  return (
    <ArticlesGrid
      articles={allArticles}
      quantities={quantities}
      prices={prices}
      preferentialPrices={preferentialPrices}
      mode="display"
      showPrices={true}
    ></ArticlesGrid>
  );
};
