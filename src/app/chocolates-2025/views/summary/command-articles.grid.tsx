import { JSX } from "react";
import { CommandsSummary } from "../../hooks";
import { Empty } from "../../../../platform/ui";
import { ArticlesGrid } from "../../components";

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
  const gifts = articles.reduce((acc, item) => {
    acc[item.article.id] = item.gift;
    return acc;
  }, {} as Record<number, number>);
  const prices = articles.reduce((acc, item) => {
    acc[item.article.id] = item.priceToGet;
    return acc;
  }, {} as Record<number, number>);
  const preferentialPrices = articles.reduce((acc, item) => {
    acc[item.article.id] = item.priceToPay;
    return acc;
  }, {} as Record<number, number>);

  return (
    <ArticlesGrid
      articles={allArticles}
      quantities={quantities}
      gifts={gifts}
      prices={prices}
      preferentialPrices={preferentialPrices}
      mode="display"
      showPrices={true}
    ></ArticlesGrid>
  );
};
