import { JSX } from "react";
import { CommandsSummary } from "../../hooks";
import { Empty, Row, Stack } from "../../../../platform/ui";

import articleImage1 from "../../../../assets/articles/1.png";
import articleImage2 from "../../../../assets/articles/2.png";
import articleImage3 from "../../../../assets/articles/3.png";
import articleImage4 from "../../../../assets/articles/4.png";
import articleImage5 from "../../../../assets/articles/5.png";
import articleImage6 from "../../../../assets/articles/6.png";
import articleImage7 from "../../../../assets/articles/7.png";
import articleImage8 from "../../../../assets/articles/8.png";
import articleImage9 from "../../../../assets/articles/9.png";
import articleImage10 from "../../../../assets/articles/10.png";
import articleImage11 from "../../../../assets/articles/11.png";
import articleImage12 from "../../../../assets/articles/12.png";
import articleImage13 from "../../../../assets/articles/13.png";
import articleImage14 from "../../../../assets/articles/14.png";
import articleImage15 from "../../../../assets/articles/15.png";
import articleImage16 from "../../../../assets/articles/16.png";
import articleImage17 from "../../../../assets/articles/17.png";
import articleImage18 from "../../../../assets/articles/18.png";
import articleImage19 from "../../../../assets/articles/19.png";
import articleImage20 from "../../../../assets/articles/20.png";
import articleImage21 from "../../../../assets/articles/21.png";
import articleImage22 from "../../../../assets/articles/22.png";
import articleImage23 from "../../../../assets/articles/23.png";
import articleImage24 from "../../../../assets/articles/24.png";
import articleImage25 from "../../../../assets/articles/25.png";
import articleImage26 from "../../../../assets/articles/26.png";
import articleImage27 from "../../../../assets/articles/27.png";

const ARTICLES_IMAGES = {
  "articles/1.png": articleImage1,
  "articles/2.png": articleImage2,
  "articles/3.png": articleImage3,
  "articles/4.png": articleImage4,
  "articles/5.png": articleImage5,
  "articles/6.png": articleImage6,
  "articles/7.png": articleImage7,
  "articles/8.png": articleImage8,
  "articles/9.png": articleImage9,
  "articles/10.png": articleImage10,
  "articles/11.png": articleImage11,
  "articles/12.png": articleImage12,
  "articles/13.png": articleImage13,
  "articles/14.png": articleImage14,
  "articles/15.png": articleImage15,
  "articles/16.png": articleImage16,
  "articles/17.png": articleImage17,
  "articles/18.png": articleImage18,
  "articles/19.png": articleImage19,
  "articles/20.png": articleImage20,
  "articles/21.png": articleImage21,
  "articles/22.png": articleImage22,
  "articles/23.png": articleImage23,
  "articles/24.png": articleImage24,
  "articles/25.png": articleImage25,
  "articles/26.png": articleImage26,
  "articles/27.png": articleImage27,
};

// Styled Components
const QuantityHeader = () => (
  <div style={{ textAlign: "center", width: "50px" }}>
    <div
      style={{
        fontSize: "13px",
        fontWeight: "700",
        color: "#374151",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
      }}
    >
      Quantité
    </div>
  </div>
);

const PriceHeader = () => (
  <div style={{ textAlign: "center", width: "60px" }}>
    <div
      style={{
        fontSize: "13px",
        fontWeight: "700",
        color: "#374151",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
      }}
    >
      Prix
    </div>
  </div>
);

const PreferentialPriceHeader = () => (
  <div style={{ textAlign: "center", width: "80px" }}>
    <div
      style={{
        fontSize: "13px",
        fontWeight: "700",
        color: "#374151",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
      }}
    >
      Prix préférentiel
    </div>
  </div>
);

const ArticleHeaders = () => (
  <div
    style={{
      padding: "8px 12px",
      marginBottom: "8px",
      height: "auto",
      width: "100%",
      display: "flex",
      alignItems: "center",
    }}
  >
    <Row justify="space" align="center">
      <div style={{ flex: 1 }}></div>
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <QuantityHeader />
        <PriceHeader />
        <PreferentialPriceHeader />
      </div>
    </Row>
  </div>
);

const ArticleImage = ({
  article,
}: {
  article: CommandsSummary["articles"][0]["article"];
}) => {
  console.log(
    "link",
    article.imageLink,
    ARTICLES_IMAGES[article.imageLink as keyof typeof ARTICLES_IMAGES]
  );
  if (!article.imageLink) {
    return null;
  }

  return (
    <div
      style={{
        width: "60px",
        height: "60px",
        marginRight: "12px",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={ARTICLES_IMAGES[article.imageLink as keyof typeof ARTICLES_IMAGES]}
        alt={article.name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "4px",
          border: "1px solid #e5e7eb",
        }}
        onError={(e) => {
          // Hide the image if it fails to load
          e.currentTarget.style.display = "none";
        }}
      />
    </div>
  );
};

const ArticleDescription = ({
  article,
}: {
  article: CommandsSummary["articles"][0]["article"];
}) => (
  <div style={{ flex: 1 }}>
    <h4
      style={{
        margin: "0 0 4px 0",
        fontSize: "15px",
        fontWeight: "500",
        color: "#1f2937",
        lineHeight: "1.4",
        letterSpacing: "0.025em",
      }}
    >
      {article.name}
    </h4>
    <div style={{ fontSize: "11px", color: "#6b7280", lineHeight: "1.3" }}>
      <div style={{ marginBottom: "2px" }}>{article.description}</div>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <span style={{ textDecoration: "line-through", color: "#9ca3af" }}>
          {article.price.toFixed(2)} €
        </span>
        <span style={{ color: "#059669", fontWeight: "500" }}>
          {article.preferentialPrice.toFixed(2)} €
        </span>
      </div>
    </div>
  </div>
);

const Quantity = ({ quantity }: { quantity: number }) => (
  <div style={{ textAlign: "center", width: "50px" }}>
    <div
      style={{
        fontSize: "16px",
        fontWeight: "600",
        color: "#374151",
        backgroundColor: "#f3f4f6",
        padding: "4px 8px",
        borderRadius: "4px",
        border: "1px solid #e5e7eb",
      }}
    >
      {quantity}
    </div>
  </div>
);

const Price = ({ price }: { price: number }) => (
  <div style={{ textAlign: "center", width: "60px" }}>
    <div
      style={{
        fontSize: "16px",
        fontWeight: "600",
        color: "#374151",
        backgroundColor: "#f3f4f6",
        padding: "4px 8px",
        borderRadius: "4px",
        border: "1px solid #e5e7eb",
      }}
    >
      {price.toFixed(2)} €
    </div>
  </div>
);

const PreferentialPrice = ({ price }: { price: number }) => (
  <div style={{ textAlign: "center", width: "80px" }}>
    <div
      style={{
        fontSize: "16px",
        fontWeight: "600",
        color: "#059669",
        backgroundColor: "#ecfdf5",
        padding: "4px 8px",
        borderRadius: "4px",
        border: "1px solid #a7f3d0",
      }}
    >
      {price.toFixed(2)} €
    </div>
  </div>
);

const Subtotal = ({ articles }: { articles: CommandsSummary["articles"] }) => {
  const totalQuantity = articles.reduce(
    (sum, article) => sum + article.quantity,
    0
  );
  const totalPrice = articles.reduce((sum, article) => sum + article.price, 0);
  const totalPreferentialPrice = articles.reduce(
    (sum, article) => sum + article.preferentialPrice,
    0
  );

  return (
    <div
      style={{
        border: "2px solid #3b82f6",
        borderRadius: "4px",
        padding: "8px 10px",
        marginTop: "8px",
        backgroundColor: "#eff6ff",
        height: "70px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        fontWeight: "600",
      }}
    >
      <Row justify="space" align="center">
        <div style={{ flex: 1 }}>
          <h4
            style={{
              margin: "0",
              fontSize: "15px",
              fontWeight: "600",
              color: "#1e40af",
            }}
          >
            Sous-total
          </h4>
        </div>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <div style={{ textAlign: "center", width: "50px" }}>
            <div
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#1e40af",
                backgroundColor: "#dbeafe",
                padding: "4px 8px",
                borderRadius: "4px",
                border: "1px solid #93c5fd",
              }}
            >
              {totalQuantity}
            </div>
          </div>
          <div style={{ textAlign: "center", width: "60px" }}>
            <div
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#1e40af",
                backgroundColor: "#dbeafe",
                padding: "4px 8px",
                borderRadius: "4px",
                border: "1px solid #93c5fd",
              }}
            >
              {totalPrice.toFixed(2)} €
            </div>
          </div>
          <div style={{ textAlign: "center", width: "80px" }}>
            <div
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#059669",
                backgroundColor: "#ecfdf5",
                padding: "4px 8px",
                borderRadius: "4px",
                border: "1px solid #a7f3d0",
              }}
            >
              {totalPreferentialPrice.toFixed(2)} €
            </div>
          </div>
        </div>
      </Row>
    </div>
  );
};

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
        border: "3px solid #1d4ed8",
        borderRadius: "6px",
        padding: "12px 16px",
        marginTop: "16px",
        backgroundColor: "#1e40af",
        height: "80px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        fontWeight: "700",
        color: "white",
      }}
    >
      <Row justify="space" align="center">
        <div style={{ flex: 1 }}>
          <h3
            style={{
              margin: "0",
              fontSize: "18px",
              fontWeight: "700",
              color: "white",
            }}
          >
            TOTAL GÉNÉRAL
          </h3>
        </div>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <div style={{ textAlign: "center", width: "50px" }}>
            <div
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                padding: "6px 10px",
                borderRadius: "6px",
                border: "2px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              {totalQuantity}
            </div>
          </div>
          <div style={{ textAlign: "center", width: "60px" }}>
            <div
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                padding: "6px 10px",
                borderRadius: "6px",
                border: "2px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              {totalPrice.toFixed(2)} €
            </div>
          </div>
          <div style={{ textAlign: "center", width: "80px" }}>
            <div
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#10b981",
                backgroundColor: "rgba(16, 185, 129, 0.2)",
                padding: "6px 10px",
                borderRadius: "6px",
                border: "2px solid rgba(16, 185, 129, 0.4)",
              }}
            >
              {totalPreferentialPrice.toFixed(2)} €
            </div>
          </div>
        </div>
      </Row>
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
        border: "3px solid #059669",
        borderRadius: "6px",
        padding: "12px 16px",
        marginTop: "8px",
        backgroundColor: "#059669",
        height: "80px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        fontWeight: "700",
        color: "white",
      }}
    >
      <Row justify="space" align="center">
        <div style={{ flex: 1 }}>
          <h3
            style={{
              margin: "0",
              fontSize: "18px",
              fontWeight: "700",
              color: "white",
            }}
          >
            BÉNÉFICE TOTAL
          </h3>
        </div>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <div style={{ textAlign: "center", width: "50px" }}>
            <div
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                padding: "6px 10px",
                borderRadius: "6px",
                border: "2px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              -
            </div>
          </div>
          <div style={{ textAlign: "center", width: "60px" }}>
            <div
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                padding: "6px 10px",
                borderRadius: "6px",
                border: "2px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              -
            </div>
          </div>
          <div style={{ textAlign: "center", width: "80px" }}>
            <div
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                padding: "6px 10px",
                borderRadius: "6px",
                border: "2px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              {totalBenefit.toFixed(2)} €
            </div>
          </div>
        </div>
      </Row>
    </div>
  );
};

const ArticlesColumn = ({
  articles,
}: {
  articles: CommandsSummary["articles"];
}) => (
  <div
    style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
    }}
  >
    <ArticleHeaders />
    <Stack spacing={2}>
      {articles.map((article) => (
        <ArticleCard key={article.article.id} article={article} />
      ))}
    </Stack>
    <Subtotal articles={articles} />
  </div>
);

const ArticleCard = ({
  article,
}: {
  article: CommandsSummary["articles"][0];
}) => (
  <div
    style={{
      border: "1px solid #d1d5db",
      borderRadius: "4px",
      padding: "4px 6px",
      marginBottom: "3px",
      backgroundColor: "#ffffff",
      height: "70px",
      width: "100%",
      display: "flex",
      alignItems: "center",
      borderLeft: "4px solid #3b82f6",
      transition: "all 0.2s ease-in-out",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderLeftColor = "#1d4ed8";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderLeftColor = "#3b82f6";
    }}
  >
    <Row justify="space" align="center">
      <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
        <ArticleImage article={article.article} />
        <ArticleDescription article={article.article} />
      </div>
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <Quantity quantity={article.quantity} />
        <Price price={article.price} />
        <PreferentialPrice price={article.preferentialPrice} />
      </div>
    </Row>
  </div>
);

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

interface CommandArticlesGridProps {
  articles: CommandsSummary["articles"];
  isLoading: boolean;
  error: Error | null;
}

// Helper function to filter articles by column
const getArticlesByColumn = (
  articles: CommandsSummary["articles"],
  columnArticles: string[]
) => {
  return articles.filter((article) =>
    columnArticles.includes(article.article.name)
  );
};

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

  const firstColumnArticles = getArticlesByColumn(
    articles,
    ARTICLES_FIRST_COLUMN
  );
  const secondColumnArticles = getArticlesByColumn(
    articles,
    ARTICLES_SECOND_COLUMN
  );

  return (
    <>
      {/* Articles Grid */}
      <div style={{ display: "flex", gap: "16px" }}>
        <ArticlesColumn articles={firstColumnArticles} />
        <ArticlesColumn articles={secondColumnArticles} />
      </div>

      {/* Global Total */}
      <GlobalTotal
        firstColumnArticles={firstColumnArticles}
        secondColumnArticles={secondColumnArticles}
      />

      {/* Total Benefit */}
      <TotalBenefit
        firstColumnArticles={firstColumnArticles}
        secondColumnArticles={secondColumnArticles}
      />
    </>
  );
};
