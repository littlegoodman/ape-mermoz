import { JSX, ReactNode } from "react";
import { Article } from "../hooks";
import { Card, Row, Stack, Text, Input } from "../../../platform/ui";
import { styled } from "../../../platform/ui/theme/stitches.config";

import articleImage1 from "../../../assets/articles/1.png";
import articleImage2 from "../../../assets/articles/2.png";
import articleImage3 from "../../../assets/articles/3.png";
import articleImage4 from "../../../assets/articles/4.png";
import articleImage5 from "../../../assets/articles/5.png";
import articleImage6 from "../../../assets/articles/6.png";
import articleImage7 from "../../../assets/articles/7.png";
import articleImage8 from "../../../assets/articles/8.png";
import articleImage9 from "../../../assets/articles/9.png";
import articleImage10 from "../../../assets/articles/10.png";
import articleImage11 from "../../../assets/articles/11.png";
import articleImage12 from "../../../assets/articles/12.png";
import articleImage13 from "../../../assets/articles/13.png";
import articleImage14 from "../../../assets/articles/14.png";
import articleImage15 from "../../../assets/articles/15.png";
import articleImage16 from "../../../assets/articles/16.png";
import articleImage17 from "../../../assets/articles/17.png";
import articleImage18 from "../../../assets/articles/18.png";
import articleImage19 from "../../../assets/articles/19.png";
import articleImage20 from "../../../assets/articles/20.png";
import articleImage21 from "../../../assets/articles/21.png";
import articleImage22 from "../../../assets/articles/22.png";
import articleImage23 from "../../../assets/articles/23.png";
import articleImage24 from "../../../assets/articles/24.png";
import articleImage25 from "../../../assets/articles/25.png";
import articleImage26 from "../../../assets/articles/26.png";
import articleImage27 from "../../../assets/articles/27.png";

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

export const ARTICLES_FIRST_COLUMN = [
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

export const ARTICLES_SECOND_COLUMN = [
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

// Helper function to filter articles by column
export const getArticlesByColumn = (
  articles: Article[],
  columnArticles: string[]
) => {
  return articles.filter((article) => columnArticles.includes(article.name));
};

// Helper function to calculate column subtotal
export const calculateColumnSubtotal = (
  articles: Article[],
  quantities: Record<number, number>
): { quantity: number; totalPriceToPay: number; totalPriceToGet: number } => {
  return {
    quantity: articles.reduce((total, article) => {
      return total + (quantities[article.id] || 0);
    }, 0),
    totalPriceToPay: articles.reduce((total, article) => {
      const quantity = quantities[article.id] || 0;
      const price = article.preferentialPrice;
      return total + quantity * price;
    }, 0),
    totalPriceToGet: articles.reduce((total, article) => {
      const quantity = quantities[article.id] || 0;
      const price = article.price;
      return total + quantity * price;
    }, 0),
  };
};

// Helper function to calculate total quantity
export const calculateTotalQuantity = (
  articles: Article[],
  quantities: Record<number, number>
) => {
  return articles.reduce((total, article) => {
    return total + (quantities[article.id] || 0);
  }, 0);
};

// Helper function to calculate total benefits
export const calculateTotalBenefits = (
  articles: Article[],
  quantities: Record<number, number>
) => {
  return articles.reduce((total, article) => {
    const quantity = quantities[article.id] || 0;
    const benefitPerUnit = article.price - article.preferentialPrice;
    return total + quantity * benefitPerUnit;
  }, 0);
};

// Styled components for elegant headers
const HeaderCell = styled("div", {
  textAlign: "center",
  fontSize: "$xs",
  fontWeight: "$semibold",
  color: "$slate700",
  textTransform: "uppercase",
  letterSpacing: "$tight",
  padding: "$2",
});

const QuantityHeader = () => (
  <HeaderCell css={{ width: "30px", minWidth: "30px" }}>Qté</HeaderCell>
);

const PriceHeader = () => (
  <HeaderCell css={{ width: "50px", minWidth: "50px" }}>À encais.</HeaderCell>
);

const PreferentialPriceHeader = () => (
  <HeaderCell css={{ width: "55px", minWidth: "55px" }}>À payer</HeaderCell>
);

const StyledHeaderRow = styled(Row, {
  marginBottom: "$2",
  padding: "$1 $2",
  background: "$slate50",
  borderRadius: "$2",
  border: "1px solid $slate200",
});

const StyledHeaderActions = styled(Row, {});

const ArticleHeaders = () => (
  <StyledHeaderRow justify="space" align="center">
    <StyledHeaderActions justify="end">
      <QuantityHeader />
      <PriceHeader />
      <PreferentialPriceHeader />
    </StyledHeaderActions>
  </StyledHeaderRow>
);

const StyledArticleImage = styled("img", {
  width: "40px",
  height: "40px",
  objectFit: "cover",
  borderRadius: "$2",
  border: "1px solid $slate200",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
});

const ArticleImage = ({ article }: { article: Article }) => {
  if (!article.imageLink) {
    return (
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "6px",
          background: "linear-gradient(135deg, #f3e8ff 0%, #fce7f3 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#7e22ce",
          fontSize: "10px",
          fontWeight: "bold",
        }}
      >
        ?
      </div>
    );
  }

  return (
    <StyledArticleImage
      src={ARTICLES_IMAGES[article.imageLink as keyof typeof ARTICLES_IMAGES]}
      alt={article.name}
    />
  );
};

const StyledDescriptionStack = styled(Stack, {
  flex: 1,
  minWidth: 0,
  maxWidth: "160px",
  width: "100%",
});

const StyledPriceRow = styled(Row, {
  gap: "$2",
});

const ArticleDescription = ({ article }: { article: Article }) => (
  <StyledDescriptionStack spacing={0}>
    <Text
      variant="bodyAlternate"
      ellipsis={true}
      css={{
        maxWidth: 140,
        fontWeight: "$semibold",
        color: "$slate800",
        fontSize: "$xs",
        lineHeight: "$s",
        marginBottom: "$1",
      }}
    >
      {article.name}
    </Text>
    <div style={{ maxWidth: 140, marginBottom: "$1" }}>
      <Text
        color="neutral"
        size="xs"
        ellipsis={true}
        css={{
          maxWidth: 140,
          color: "$slate500",
          lineHeight: "$xs",
          fontSize: "$xs",
        }}
      >
        {article.description}
      </Text>
    </div>
    <StyledPriceRow align="center">
      <Text
        color="neutral"
        size="xs"
        crossedOut={true}
        css={{
          color: "$slate400",
          fontSize: "$xs",
        }}
      >
        {article.price.toFixed(2)} €
      </Text>
      <Text
        color="primary"
        size="xs"
        css={{
          fontWeight: "$bold",
          color: "#7e22ce",
          fontSize: "$xs",
        }}
      >
        {article.preferentialPrice.toFixed(2)} €
      </Text>
    </StyledPriceRow>
  </StyledDescriptionStack>
);

const QuantityContainer = styled("div", {
  position: "relative",
  display: "inline-block",
});

const GiftBadge = styled("div", {
  position: "absolute",
  top: "-14px",
  right: "-30px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "1px 4px",
  background: "#fef3c7",
  color: "#92400e",
  borderRadius: "50%",
  fontSize: "8px",
  fontWeight: "$bold",
  minWidth: "20px",
  height: "18px",
  border: "1.5px solid #fbbf24",
  lineHeight: 1,
  zIndex: 1,
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
  gap: "2px",
});

const QuantityDisplay = ({
  quantity,
  gift,
}: {
  quantity: number;
  gift?: number;
}) => (
  <QuantityContainer>
    <Text
      size="s"
      weight="bold"
      noWrap
      css={{
        textAlign: "center",
        padding: "$1",
        background: quantity > 0 ? "#f3e8ff" : "$slate100",
        color: quantity > 0 ? "#7e22ce" : "$slate500",
        borderRadius: "$2",
        minWidth: "35px",
        fontSize: "$xs",
        border: quantity > 0 ? "1px solid #c084fc" : "1px solid $slate300",
      }}
    >
      {quantity ? quantity : "-"}
    </Text>
    {gift !== undefined && gift > 0 && (
      <GiftBadge title={`${gift} cadeau${gift > 1 ? "x" : ""}`}>
        dont {gift} 🎁
      </GiftBadge>
    )}
  </QuantityContainer>
);

const PriceDisplay = ({ price }: { price: number }) => (
  <Text
    size="xs"
    weight="bold"
    noWrap
    css={{
      textAlign: "center",
      padding: "2px $1",
      background: "$slate100",
      color: "$slate700",
      borderRadius: "$1",
      minWidth: "45px",
      fontSize: "$xs",
    }}
  >
    {price ? `${price.toFixed(2)} €` : "-"}
  </Text>
);

const PreferentialPriceDisplay = ({ price }: { price: number }) => (
  <Text
    size="xs"
    weight="bold"
    color="primary"
    noWrap
    css={{
      textAlign: "center",
      padding: "2px $1",
      background: "$pink100",
      color: "$pink700",
      borderRadius: "$1",
      minWidth: "55px",
      fontSize: "$xs",
    }}
  >
    {price ? `${price.toFixed(2)} €` : "-"}
  </Text>
);

const QuantityInputWrapper = styled("div", {
  display: "flex",
  alignItems: "center",
  position: "relative",
  width: "60px",
});

const QuantityInput = styled(Input, {
  textAlign: "center",
  fontSize: "$s",
  fontWeight: "$semibold",
  "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
    "-webkit-appearance": "none",
    margin: 0,
  },
  "-moz-appearance": "textfield",
});

const SpinnerButtons = styled("div", {
  position: "absolute",
  right: "4px",
  top: "33%",
  transform: "translateY(-50%)",
  display: "flex",
  flexDirection: "column",
  gap: "0px",
  borderRadius: "$1",
  background: "transparent",
});

const SpinnerButton = styled("button", {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  padding: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "$xs",
  color: "$slate500",
  transition: "color 0.2s ease",
  width: "14px",
  height: "2px",
  lineHeight: "0",
  outline: "none",
  "&:hover": {
    color: "#a21caf",
  },
  "&:active": {
    transform: "scale(0.95)",
  },
});

interface ArticleCardProps {
  article: Article;
  quantity: number;
  gift?: number;
  price?: number;
  preferentialPrice?: number;
  mode: "display" | "edit";
  onQuantityChange?: (articleId: number, value: string) => void;
}

interface CustomQuantityInputProps {
  value: number;
  onChange: (value: string) => void;
}

const CustomQuantityInput = ({ value, onChange }: CustomQuantityInputProps) => {
  const handleIncrement = () => {
    onChange(String((value || 0) + 1));
  };

  const handleDecrement = () => {
    onChange(String(Math.max(0, (value || 0) - 1)));
  };

  return (
    <QuantityInputWrapper>
      <QuantityInput
        type="number"
        min="0"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        placeholder="0"
      />
      <SpinnerButtons>
        <SpinnerButton onClick={handleIncrement} type="button">
          ▲
        </SpinnerButton>
        <SpinnerButton onClick={handleDecrement} type="button">
          ▼
        </SpinnerButton>
      </SpinnerButtons>
    </QuantityInputWrapper>
  );
};

const StyledArticleCard = styled(Card, {
  fullWidth: true,
  padding: "$2",
  marginBottom: "$1",
  background: "$white",
  border: "1px solid $slate200",
  borderRadius: "$2",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  width: "100%",
  transition: "all 0.2s ease-in-out",
  minHeight: "60px",
  display: "flex",
  alignItems: "center",
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    borderColor: "$slate300",
    background: "$pink25",
  },
});

const StyledCardRow = styled(Row, {
  gap: "$1",
});

const StyledActionsRow = styled(Row, {
  gap: "$1",
  minWidth: "70px",
  flexShrink: 0,
  justifyContent: "flex-end",
});

const ArticleCard = ({
  article,
  quantity,
  gift,
  price,
  preferentialPrice,
  mode,
  onQuantityChange,
}: ArticleCardProps) => (
  <StyledArticleCard>
    <StyledCardRow align="center">
      <ArticleImage article={article} />
      <ArticleDescription article={article} />
      <StyledActionsRow align="center">
        {mode === "edit" ? (
          <CustomQuantityInput
            value={quantity}
            onChange={(value) => onQuantityChange?.(article.id, value)}
          />
        ) : (
          <>
            <QuantityDisplay quantity={quantity} gift={gift} />
            {price !== undefined && <PriceDisplay price={price} />}
            {preferentialPrice !== undefined && (
              <PreferentialPriceDisplay price={preferentialPrice} />
            )}
          </>
        )}
      </StyledActionsRow>
    </StyledCardRow>
  </StyledArticleCard>
);

interface ArticlesColumnProps {
  articles: Article[];
  quantities: Record<number, number>;
  gifts?: Record<number, number>;
  prices?: Record<number, number>;
  preferentialPrices?: Record<number, number>;
  mode: "display" | "edit";
  showPrices?: boolean;
  onQuantityChange?: (articleId: number, value: string) => void;
}

const StyledColumn = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  minWidth: 0,
  flex: "1 1 auto",
  padding: "$1",
});

const ArticlesColumn = ({
  articles,
  quantities,
  gifts,
  prices,
  preferentialPrices,
  mode,
  showPrices = false,
  onQuantityChange,
}: ArticlesColumnProps) => {
  return (
    <StyledColumn>
      {showPrices && <ArticleHeaders />}
      <Stack spacing={1}>
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            quantity={quantities[article.id] || 0}
            gift={gifts?.[article.id] || 0}
            price={prices?.[article.id]}
            preferentialPrice={preferentialPrices?.[article.id]}
            mode={mode}
            onQuantityChange={onQuantityChange}
          />
        ))}
      </Stack>
    </StyledColumn>
  );
};

interface ArticlesGridProps {
  articles: Article[];
  quantities: Record<number, number>;
  gifts?: Record<number, number>;
  prices?: Record<number, number>;
  preferentialPrices?: Record<number, number>;
  mode: "display" | "edit";
  showPrices?: boolean;
  onQuantityChange?: (articleId: number, value: string) => void;
  children?: ReactNode;
}

const StyledGridContainer = styled("div", {
  width: "100%",
  padding: "$1",
  boxSizing: "border-box",
});

const StyledMainRow = styled(Row, {
  gap: "$1",
  alignItems: "flex-start",
});

// Subtotal component
const StyledSubtotal = styled("div", {
  marginBottom: "$2",
  padding: "$2 $3",
  background: "linear-gradient(135deg, #fce7f3 0%, #f3e8ff 100%)",
  borderRadius: "$2",
  border: "1px solid #f0abfc",
  boxShadow: "0 2px 6px rgba(236, 72, 153, 0.1)",
  textAlign: "center",
});

const SubtotalLabel = styled(Text, {
  fontSize: "$xs",
  fontWeight: "$bold",
  textTransform: "uppercase",
  letterSpacing: "$base",
  marginBottom: "$1",
  "&": {
    color: "#7e22ce !important",
  },
});

// removed unused SubtotalAmount in favor of compact metrics display

interface SubtotalProps {
  label?: string;
  quantity: number;
  totalPriceToPay: number;
  totalPriceToGet: number;
}

const SubtotalMetrics = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "$3",
  marginTop: "$1",
  flexWrap: "wrap",
});

const SubMetric = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$1",
  padding: "$1 $2",
  background: "transparent",
  borderRadius: "$2",
  border: "1px solid $pink200",
});

const SubMetricLabel = styled(Text, {
  fontSize: "$xs",
  color: "$slate600",
});

const SubMetricValue = styled(Text, {
  fontSize: "$s",
  fontWeight: "$bold",
  color: "#a21caf",
});

const Subtotal = ({
  label = "Sous-total",
  quantity,
  totalPriceToPay,
  totalPriceToGet,
}: SubtotalProps) => (
  <StyledSubtotal>
    <SubtotalLabel>{label}</SubtotalLabel>
    <SubtotalMetrics>
      <SubMetric>
        <SubMetricLabel>Articles</SubMetricLabel>
        <SubMetricValue>{quantity}</SubMetricValue>
      </SubMetric>
      <SubMetric>
        <SubMetricLabel>A encaisser</SubMetricLabel>
        <SubMetricValue>{totalPriceToGet.toFixed(2)} €</SubMetricValue>
      </SubMetric>
      <SubMetric>
        <SubMetricLabel>À payer</SubMetricLabel>
        <SubMetricValue>{totalPriceToPay.toFixed(2)} €</SubMetricValue>
      </SubMetric>
    </SubtotalMetrics>
  </StyledSubtotal>
);

// Grand total component
const StyledGrandTotal = styled("div", {
  marginBottom: "$2",
  padding: "$4 $5",
  background: "linear-gradient(135deg, $pink500 0%, $purple500 100%)",
  borderRadius: "$3",
  border: "2px solid $pink500",
  boxShadow: "$lg",
  textAlign: "center",
  position: "relative",
  overflow: "hidden",
});

const GrandTotalLabel = styled(Text, {
  fontSize: "$s",
  fontWeight: "$bold",
  textTransform: "uppercase",
  letterSpacing: "$base",
  marginBottom: "$3",
  "&": {
    color: "white !important",
    textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
  },
});

const GrandTotalMetrics = styled("div", {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  gap: "$4",
  flexWrap: "wrap",
});

const MetricItem = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minWidth: "100px",
  padding: "$2 $3",
  background: "rgba(0, 0, 0, 0.2)",
  borderRadius: "$2",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  backdropFilter: "blur(10px)",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    background: "rgba(0, 0, 0, 0.3)",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
  },
});

const MetricLabel = styled(Text, {
  fontSize: "$xs",
  fontWeight: "$medium",
  marginBottom: "$2",
  textTransform: "uppercase",
  letterSpacing: "$tight",
  "&": {
    color: "white !important",
    textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
  },
});

const MetricValue = styled(Text, {
  fontSize: "$l",
  fontWeight: "$bolder",
  fontFamily: "$primary",
  "&": {
    color: "white !important",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
  },
});

interface GrandTotalProps {
  totalQuantity: number;
  totalPriceToPay: number;
  totalPriceToGet: number;
  totalBenefits: number;
  label?: string;
}

const GrandTotal = ({
  totalQuantity,
  totalPriceToPay,
  totalPriceToGet,
  totalBenefits,
  label = "Total Général",
}: GrandTotalProps) => (
  <StyledGrandTotal>
    <GrandTotalLabel>{label}</GrandTotalLabel>
    <GrandTotalMetrics>
      <MetricItem>
        <MetricLabel>Articles</MetricLabel>
        <MetricValue>{totalQuantity}</MetricValue>
      </MetricItem>
      <MetricItem>
        <MetricLabel>Montant à encaisser</MetricLabel>
        <MetricValue>{totalPriceToGet.toFixed(2)} €</MetricValue>
      </MetricItem>
      <MetricItem>
        <MetricLabel>Montant à payer à Jeff</MetricLabel>
        <MetricValue>{totalPriceToPay.toFixed(2)} €</MetricValue>
      </MetricItem>
      <MetricItem>
        <MetricLabel>Bénéfices</MetricLabel>
        <MetricValue>{totalBenefits.toFixed(2)} €</MetricValue>
      </MetricItem>
    </GrandTotalMetrics>
  </StyledGrandTotal>
);

export const ArticlesGrid = ({
  articles,
  quantities,
  gifts,
  prices,
  preferentialPrices,
  mode,
  showPrices = false,
  onQuantityChange,
  children,
}: ArticlesGridProps): JSX.Element => {
  const firstColumnArticles = getArticlesByColumn(
    articles,
    ARTICLES_FIRST_COLUMN
  );
  const secondColumnArticles = getArticlesByColumn(
    articles,
    ARTICLES_SECOND_COLUMN
  );

  // Calculate grand total metrics
  const firstColumnSubtotal = calculateColumnSubtotal(
    firstColumnArticles,
    quantities
  );
  const secondColumnSubtotal = calculateColumnSubtotal(
    secondColumnArticles,
    quantities
  );
  const totalPriceToPay =
    firstColumnSubtotal.totalPriceToPay + secondColumnSubtotal.totalPriceToPay;
  const totalPriceToGet =
    firstColumnSubtotal.totalPriceToGet + secondColumnSubtotal.totalPriceToGet;
  const totalQuantity = calculateTotalQuantity(articles, quantities);
  const totalBenefits = calculateTotalBenefits(articles, quantities);

  return (
    <StyledGridContainer>
      <Stack spacing={2}>
        <Row justify="center">
          <GrandTotal
            totalQuantity={totalQuantity}
            totalPriceToPay={totalPriceToPay}
            totalPriceToGet={totalPriceToGet}
            totalBenefits={totalBenefits}
          />
        </Row>

        <StyledMainRow align="stretch">
          <ArticlesColumn
            articles={firstColumnArticles}
            quantities={quantities}
            gifts={gifts}
            prices={prices}
            preferentialPrices={preferentialPrices}
            mode={mode}
            showPrices={showPrices}
            onQuantityChange={onQuantityChange}
          />
          <ArticlesColumn
            articles={secondColumnArticles}
            quantities={quantities}
            gifts={gifts}
            prices={prices}
            preferentialPrices={preferentialPrices}
            mode={mode}
            showPrices={showPrices}
            onQuantityChange={onQuantityChange}
          />
        </StyledMainRow>
        <StyledMainRow align="stretch">
          <StyledColumn>
            <Subtotal
              label="Sous-total 1"
              quantity={firstColumnSubtotal.quantity}
              totalPriceToPay={firstColumnSubtotal.totalPriceToPay}
              totalPriceToGet={firstColumnSubtotal.totalPriceToGet}
            />
          </StyledColumn>
          <StyledColumn>
            <Subtotal
              label="Sous-total 2"
              quantity={secondColumnSubtotal.quantity}
              totalPriceToPay={secondColumnSubtotal.totalPriceToPay}
              totalPriceToGet={secondColumnSubtotal.totalPriceToGet}
            />
          </StyledColumn>
        </StyledMainRow>
        {children}
      </Stack>
    </StyledGridContainer>
  );
};
