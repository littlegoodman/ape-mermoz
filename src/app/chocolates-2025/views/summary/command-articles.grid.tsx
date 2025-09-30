import { JSX } from "react";
import { CommandsSummary } from "../../hooks";
import { Empty, Row, Stack } from "../../../../platform/ui";

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
  "Le sac (24 x 28 x 11 cm)",
  "La boite en métal Giandujas 260g net",
  "Le coffret métal 330g net",
  'La boite "Choco\'pralinés" 280g net',
  "La boite sujets de Noël 245g net",
  "La boule de Noël en métal 64g net",
  "La boite ours en guimauve 375g net",
  "La boite ours en guimauve caramel 320 g net",
  "La boite bombes de chocolat chaud 200g net",
  "Le sachet de 8 ours en chocolat 96g net",
];

const ARTICLES_SECOND_COLUMN = [
  "La boite Juliettes 285g net",
  "Amandes et noisettes au chocolat 230 g net",
  "La boite Gustaves 325g net",
  "Les marrons glacés en morceaux 250g net",
  "Les orangettes 260g net",
  "Les pâtes de fruits 250g net",
];

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
