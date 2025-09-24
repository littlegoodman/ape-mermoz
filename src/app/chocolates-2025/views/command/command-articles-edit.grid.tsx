import { JSX, useCallback } from "react";
import { Command, useArticles, Article } from "../../hooks";
import { Empty, Input } from "../../../../platform/ui";
import { styled } from "../../../../platform/ui/theme/stitches.config";

interface CommandArticlesEditGridProps {
  articles: Command["articles"];
  onArticlesChange: (articles: Command["articles"]) => void;
  isLoading?: boolean;
  error?: Error | null;
}

const GridContainer = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "$4",
  padding: "$4",
});

const ArticleCard = styled("div", {
  border: "1px solid $border",
  borderRadius: "$2",
  padding: "$3",
  backgroundColor: "$surface",
  display: "flex",
  flexDirection: "column",
  gap: "$2",
});

const ArticleHeader = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$1",
});

const ArticleTitle = styled("h3", {
  fontSize: "$lg",
  fontWeight: "$semibold",
  color: "$text",
  margin: 0,
});

const ArticleDescription = styled("p", {
  fontSize: "$sm",
  color: "$textSecondary",
  margin: 0,
  lineHeight: "$relaxed",
});

const QuantityContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$2",
  marginTop: "$2",
});

const QuantityLabel = styled("label", {
  fontSize: "$sm",
  fontWeight: "$medium",
  color: "$text",
});

const QuantityInput = styled(Input, {
  width: "80px",
});

export const CommandArticlesEditGrid = ({
  articles,
  onArticlesChange,
  isLoading = false,
  error = null,
}: CommandArticlesEditGridProps): JSX.Element => {
  const { findAll } = useArticles();
  const {
    data: allArticles,
    isLoading: articlesLoading,
    error: articlesError,
  } = findAll();

  // Create a map of article quantities from the command
  const commandQuantities = articles.reduce((acc, item) => {
    acc[item.article.id] = item.quantity;
    return acc;
  }, {} as Record<number, number>);

  const handleQuantityChange = useCallback(
    (articleId: number, value: string) => {
      const quantity = parseInt(value) || 0;
      onArticlesChange?.(
        articles.map((article) =>
          article.article.id === articleId ? { ...article, quantity } : article
        )
      );
    },
    [onArticlesChange]
  );

  if (isLoading || articlesLoading) {
    return <Empty title="Chargement..." />;
  }

  if (error || articlesError) {
    return (
      <Empty title="Erreur" subtitle={(error || articlesError)?.message} />
    );
  }

  if (!allArticles || allArticles.length === 0) {
    return <Empty title="Aucun article disponible" />;
  }

  return (
    <GridContainer>
      {allArticles.map((article: Article) => {
        const currentQuantity = commandQuantities[article.id] || 0;

        return (
          <ArticleCard key={article.id}>
            <ArticleHeader>
              <ArticleTitle>{article.name}</ArticleTitle>
              <ArticleDescription>{article.description}</ArticleDescription>
            </ArticleHeader>
            <QuantityContainer>
              <QuantityLabel htmlFor={`quantity-${article.id}`}>
                Quantité:
              </QuantityLabel>
              <QuantityInput
                id={`quantity-${article.id}`}
                type="number"
                min="0"
                value={currentQuantity}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleQuantityChange(article.id, e.target.value)
                }
                placeholder="0"
              />
            </QuantityContainer>
          </ArticleCard>
        );
      })}
    </GridContainer>
  );
};
