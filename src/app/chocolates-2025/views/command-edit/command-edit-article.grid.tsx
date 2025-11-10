import { JSX, useCallback } from "react";
import { Command, useArticles } from "../../hooks";
import { Empty } from "../../../../platform/ui";
import { ArticlesGrid } from "../../components";

interface CommandEditArticlesGridProps {
  articles: Command["articles"];
  onArticlesChange: (articles: Command["articles"]) => void;
  isLoading?: boolean;
  error?: Error | null;
}

export const CommandEditArticlesGrid = ({
  articles,
  onArticlesChange,
  isLoading = false,
  error = null,
}: CommandEditArticlesGridProps): JSX.Element => {
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
      onArticlesChange(
        (allArticles ?? []).map((article) =>
          article.id === articleId
            ? { article, quantity }
            : { article, quantity: commandQuantities[article.id] || 0 }
        )
      );
    },
    [onArticlesChange, allArticles, commandQuantities]
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
    <ArticlesGrid
      articles={allArticles}
      quantities={commandQuantities}
      mode="edit"
      showPrices={false}
      onQuantityChange={handleQuantityChange}
    />
  );
};
