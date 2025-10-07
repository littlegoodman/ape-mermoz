import { JSX } from "react";
import { Article, CommandsSummary } from "../../hooks";
import { Card, Empty, Row, Stack, Text } from "../../../../platform/ui";

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

const QuantityHeader = () => (
  <div
    style={{
      textAlign: "center",
      width: "50px",
      fontSize: "13px",
      fontWeight: "700",
      color: "#374151",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    }}
  >
    Quantité
  </div>
);

const PriceHeader = () => (
  <div
    style={{
      fontSize: "13px",
      fontWeight: "700",
      color: "#374151",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      textAlign: "center",
      width: "60px",
    }}
  >
    Prix
  </div>
);

const PreferentialPriceHeader = () => (
  <div
    style={{
      textAlign: "center",
      width: "80px",
      fontSize: "13px",
      fontWeight: "700",
      color: "#374151",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    }}
  >
    Prix préf.
  </div>
);

const ArticleHeaders = () => (
  <div
    style={{
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
  if (!article.imageLink) {
    return null;
  }

  return (
    <img
      src={ARTICLES_IMAGES[article.imageLink as keyof typeof ARTICLES_IMAGES]}
      alt={article.name}
      style={{
        width: "45px",
        height: "45px",
        objectFit: "cover",
        borderRadius: "4px",
        border: "1px solid #e5e7eb",
      }}
    />
  );
};

const ArticleDescription = ({ article }: { article: Article }) => (
  <Stack spacing={0}>
    <Text variant="bodyAlternate">{article.name}</Text>
    <div style={{ maxWidth: 150 }}>
      <Text color="neutral" size="xs" ellipsis={true}>
        {article.description}
      </Text>
    </div>
    <Row>
      <Text color="neutral" size="xs" crossedOut={true}>
        {article.price.toFixed(2)} €
      </Text>
      <Text color="primary" size="xs">
        {article.preferentialPrice.toFixed(2)} €
      </Text>
    </Row>
  </Stack>
);

const Quantity = ({ quantity }: { quantity: number }) => (
  <Text size="s" weight="bold" noWrap>
    {quantity}
  </Text>
);

const Price = ({ price }: { price: number }) => (
  <Text size="s" weight="bold" noWrap>
    {price.toFixed(2)} €
  </Text>
);

const PreferentialPrice = ({ price }: { price: number }) => (
  <Text size="s" weight="bold" color="primary" noWrap>
    {price.toFixed(2)} €
  </Text>
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
        border: "1px solid #3b82f6",
        borderRadius: "4px",
        marginTop: "8px",
        backgroundColor: "#eff6ff",
        height: "50px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        fontWeight: "600",
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
          <h4
            style={{
              margin: "0",
              fontSize: "13px",
              fontWeight: "600",
              color: "#1e40af",
            }}
          >
            Sous-total
          </h4>
        </div>
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <div
            style={{ textAlign: "center", minWidth: "35px", flex: "0 0 35px" }}
          >
            <div
              style={{
                fontSize: "12px",
                fontWeight: "600",
                color: "#1e40af",
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
                fontSize: "12px",
                fontWeight: "600",
                color: "#1e40af",
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
                fontSize: "12px",
                fontWeight: "600",
                color: "#059669",
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

const ArticlesColumn = ({
  articles,
}: {
  articles: CommandsSummary["articles"];
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      minWidth: 0,
      width: "100%",
    }}
  >
    <ArticleHeaders />
    <Stack spacing={1}>
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
  <Card fullWidth>
    <Row>
      <ArticleImage article={article.article} />
      <ArticleDescription article={article.article} />
      <Quantity quantity={article.quantity} />
      <Price price={article.price} />
      <PreferentialPrice price={article.preferentialPrice} />
    </Row>
  </Card>
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
    <Stack>
      <Row>
        <ArticlesColumn articles={firstColumnArticles} />
        <ArticlesColumn articles={secondColumnArticles} />
      </Row>
      <GlobalTotal
        firstColumnArticles={firstColumnArticles}
        secondColumnArticles={secondColumnArticles}
      />
      <TotalBenefit
        firstColumnArticles={firstColumnArticles}
        secondColumnArticles={secondColumnArticles}
      />
    </Stack>
  );
};
