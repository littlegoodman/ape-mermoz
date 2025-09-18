import { JSX } from "react";
import { CommandsSummary } from "../hooks";
import { Empty, Row, Stack } from "../../../platform/ui";

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

  return (
    <Stack spacing={2} align="start" justify="start">
      {articles.map((article) => (
        <Row key={article.article.id}>
          <Stack key={article.article.id} spacing={2}>
            <h3>{article.article.name}</h3>
            <p>{article.article.description}</p>
            <Stack spacing={1}>
              <div>Quantité: {article.quantity}</div>
              <div>Prix total: {article.price.toFixed(2)} €</div>
              <div>
                Prix préférentiel total: {article.preferentialPrice.toFixed(2)}{" "}
                €
              </div>
            </Stack>
          </Stack>
        </Row>
      ))}
    </Stack>
  );
};
