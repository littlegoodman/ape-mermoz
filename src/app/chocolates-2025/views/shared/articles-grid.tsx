import { JSX, ReactNode } from "react";
import { Article } from "../../hooks";
import { Card, Row, Stack, Text, Input } from "../../../../platform/ui";
import { styled } from "../../../../platform/ui/theme/stitches.config";

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
  quantities: Record<number, number>,
  usePreferentialPrice: boolean = true
) => {
  return articles.reduce((total, article) => {
    const quantity = quantities[article.id] || 0;
    const price = usePreferentialPrice
      ? article.preferentialPrice
      : article.price;
    return total + quantity * price;
  }, 0);
};

// Styled components for elegant headers
const HeaderCell = styled("div", {
  textAlign: "center",
  fontSize: "10px",
  fontWeight: "$bold",
  color: "$slate600",
  textTransform: "uppercase",
  letterSpacing: "$base",
  padding: "$1",
  borderBottom: "1px solid $pink200",
  background: "linear-gradient(135deg, $pink50 0%, $purple50 100%)",
  borderRadius: "$1 $1 0 0",
});

const QuantityHeader = () => (
  <HeaderCell css={{ width: "40px", minWidth: "40px" }}>Qté</HeaderCell>
);

const PriceHeader = () => (
  <HeaderCell css={{ width: "50px", minWidth: "50px" }}>Prix</HeaderCell>
);

const PreferentialPriceHeader = () => (
  <HeaderCell css={{ width: "60px", minWidth: "60px" }}>Prix préf.</HeaderCell>
);

const StyledHeaderRow = styled(Row, {
  marginBottom: "$2",
  padding: "$1 $2",
  background: "linear-gradient(135deg, $pink100 0%, $purple100 100%)",
  borderRadius: "$2",
  boxShadow: "$vlt",
});

const StyledHeaderActions = styled(Row, {
  gap: "$2",
});

const ArticleHeaders = ({ showPrices = false }: { showPrices?: boolean }) => (
  <StyledHeaderRow justify="space" align="center">
    <div style={{ flex: 1 }}></div>
    <StyledHeaderActions align="center">
      <QuantityHeader />
      {showPrices && <PriceHeader />}
      {showPrices && <PreferentialPriceHeader />}
    </StyledHeaderActions>
  </StyledHeaderRow>
);

const StyledArticleImage = styled("img", {
  width: "40px",
  height: "40px",
  objectFit: "cover",
  borderRadius: "$2",
  border: "1px solid $pink200",
  boxShadow: "$vlt",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "$soft",
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
          background: "linear-gradient(135deg, $pink200 0%, $purple200 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "$slate500",
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
  maxWidth: "200px",
  width: "100%",
});

const StyledPriceRow = styled(Row, {
  gap: "$2",
});

const ArticleDescription = ({ article }: { article: Article }) => (
  <StyledDescriptionStack spacing={0}>
    <Text
      variant="bodyAlternate"
      css={{
        fontWeight: "$medium",
        color: "$slate700",
        fontSize: "$xs",
        lineHeight: "$s",
      }}
    >
      {article.name}
    </Text>
    <div style={{ maxWidth: 160 }}>
      <Text
        color="neutral"
        size="xs"
        ellipsis={true}
        css={{
          color: "$slate500",
          lineHeight: "$xs",
          fontSize: "10px",
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
          fontSize: "10px",
        }}
      >
        {article.price.toFixed(2)} €
      </Text>
      <Text
        color="primary"
        size="xs"
        css={{
          fontWeight: "$bold",
          color: "$pink600",
          fontSize: "$xs",
        }}
      >
        {article.preferentialPrice.toFixed(2)} €
      </Text>
    </StyledPriceRow>
  </StyledDescriptionStack>
);

const QuantityDisplay = ({ quantity }: { quantity: number }) => (
  <Text
    size="xs"
    weight="bold"
    noWrap
    css={{
      textAlign: "center",
      padding: "$1",
      background: quantity > 0 ? "$pink100" : "$slate100",
      color: quantity > 0 ? "$pink700" : "$slate500",
      borderRadius: "$1",
      minWidth: "30px",
      fontSize: "$xs",
    }}
  >
    {quantity}
  </Text>
);

const PriceDisplay = ({ price }: { price: number }) => (
  <Text
    size="xs"
    weight="bold"
    noWrap
    css={{
      textAlign: "center",
      padding: "$1",
      background: "$slate100",
      color: "$slate700",
      borderRadius: "$1",
      minWidth: "50px",
      fontSize: "$xs",
    }}
  >
    {price.toFixed(2)} €
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
      padding: "$1",
      background: "$pink100",
      color: "$pink700",
      borderRadius: "$1",
      minWidth: "60px",
      fontSize: "$xs",
    }}
  >
    {price.toFixed(2)} €
  </Text>
);

const QuantityInput = styled(Input, {
  width: "50px",
  textAlign: "center",
  fontSize: "$xs",
  fontWeight: "$medium",
  border: "1px solid $pink200",
  borderRadius: "$1",
  padding: "$1",
  "&:focus": {
    borderColor: "$pink400",
    boxShadow: "0 0 0 2px rgba(244, 114, 182, 0.1)",
  },
  "&:hover": {
    borderColor: "$pink300",
  },
});

interface ArticleCardProps {
  article: Article;
  quantity: number;
  price?: number;
  preferentialPrice?: number;
  mode: "display" | "edit";
  onQuantityChange?: (articleId: number, value: string) => void;
}

const StyledArticleCard = styled(Card, {
  fullWidth: true,
  padding: "$2",
  marginBottom: "$1",
  background: "linear-gradient(135deg, $white 0%, $pink50 100%)",
  border: "1px solid $pink200",
  borderRadius: "$2",
  boxShadow: "$vlt",
  width: "100%",
  transition: "all 0.2s ease-in-out",
  minHeight: "60px",
  display: "flex",
  alignItems: "center",
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: "$soft",
    borderColor: "$pink300",
  },
});

const StyledCardRow = styled(Row, {
  gap: "$2",
});

const StyledActionsRow = styled(Row, {
  gap: "$1",
  minWidth: "120px",
  justifyContent: "flex-end",
});

const ArticleCard = ({
  article,
  quantity,
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
          <QuantityInput
            type="number"
            min="0"
            value={quantity}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onQuantityChange?.(article.id, e.target.value)
            }
            placeholder="0"
          />
        ) : (
          <>
            <QuantityDisplay quantity={quantity} />
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
  width: "100%",
  flex: "1 1 50%",
  padding: "$1",
  background: "linear-gradient(135deg, $pink25 0%, $purple25 100%)",
  borderRadius: "$3",
  border: "1px solid $pink100",
});

const ArticlesColumn = ({
  articles,
  quantities,
  prices,
  preferentialPrices,
  mode,
  showPrices = false,
  onQuantityChange,
}: ArticlesColumnProps) => {
  const subtotal = calculateColumnSubtotal(articles, quantities, true);

  return (
    <StyledColumn>
      <Subtotal amount={subtotal} />
      <ArticleHeaders showPrices={showPrices} />
      <Stack spacing={1}>
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            quantity={quantities[article.id] || 0}
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
  prices?: Record<number, number>;
  preferentialPrices?: Record<number, number>;
  mode: "display" | "edit";
  showPrices?: boolean;
  onQuantityChange?: (articleId: number, value: string) => void;
  children?: ReactNode;
}

const StyledGridContainer = styled("div", {
  background: "linear-gradient(135deg, $pink50 0%, $purple50 100%)",
  borderRadius: "$3",
  padding: "$2",
  boxShadow: "$soft",
  border: "1px solid $pink200",
});

const StyledMainRow = styled(Row, {
  gap: "$2",
});

// Subtotal component
const StyledSubtotal = styled("div", {
  marginBottom: "$2",
  padding: "$2 $3",
  background: "linear-gradient(135deg, $pink200 0%, $purple200 100%)",
  borderRadius: "$2",
  border: "1px solid $pink300",
  boxShadow: "$vlt",
  textAlign: "center",
});

const SubtotalLabel = styled(Text, {
  fontSize: "$xs",
  fontWeight: "$bold",
  color: "$slate600",
  textTransform: "uppercase",
  letterSpacing: "$base",
  marginBottom: "$1",
});

const SubtotalAmount = styled(Text, {
  fontSize: "$m",
  fontWeight: "$bold",
  color: "$pink700",
  fontFamily: "$primary",
});

interface SubtotalProps {
  amount: number;
  label?: string;
}

const Subtotal = ({ amount, label = "Sous-total" }: SubtotalProps) => (
  <StyledSubtotal>
    <SubtotalLabel>{label}</SubtotalLabel>
    <SubtotalAmount>{amount.toFixed(2)} €</SubtotalAmount>
  </StyledSubtotal>
);

// Grand total component
const StyledGrandTotal = styled("div", {
  marginBottom: "$2",
  padding: "$2 $3",
  background: "linear-gradient(135deg, $pink300 0%, $purple300 100%)",
  borderRadius: "$3",
  border: "2px solid $pink400",
  boxShadow: "$soft",
  textAlign: "center",
});

const GrandTotalLabel = styled(Text, {
  fontSize: "$s",
  fontWeight: "$bold",
  color: "$white",
  textTransform: "uppercase",
  letterSpacing: "$base",
  marginBottom: "$1",
});

const GrandTotalAmount = styled(Text, {
  fontSize: "$xl",
  fontWeight: "$bolder",
  color: "$white",
  fontFamily: "$primary",
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
});

interface GrandTotalProps {
  amount: number;
  label?: string;
}

const GrandTotal = ({ amount, label = "Total Général" }: GrandTotalProps) => (
  <StyledGrandTotal>
    <GrandTotalLabel>{label}</GrandTotalLabel>
    <GrandTotalAmount>{amount.toFixed(2)} €</GrandTotalAmount>
  </StyledGrandTotal>
);

export const ArticlesGrid = ({
  articles,
  quantities,
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

  // Calculate grand total
  const firstColumnSubtotal = calculateColumnSubtotal(
    firstColumnArticles,
    quantities,
    true
  );
  const secondColumnSubtotal = calculateColumnSubtotal(
    secondColumnArticles,
    quantities,
    true
  );
  const grandTotal = firstColumnSubtotal + secondColumnSubtotal;

  return (
    <StyledGridContainer>
      <Stack spacing={2}>
        <GrandTotal amount={grandTotal} />
        <StyledMainRow align="stretch">
          <ArticlesColumn
            articles={firstColumnArticles}
            quantities={quantities}
            prices={prices}
            preferentialPrices={preferentialPrices}
            mode={mode}
            showPrices={showPrices}
            onQuantityChange={onQuantityChange}
          />
          <ArticlesColumn
            articles={secondColumnArticles}
            quantities={quantities}
            prices={prices}
            preferentialPrices={preferentialPrices}
            mode={mode}
            showPrices={showPrices}
            onQuantityChange={onQuantityChange}
          />
        </StyledMainRow>
        {children}
      </Stack>
    </StyledGridContainer>
  );
};
