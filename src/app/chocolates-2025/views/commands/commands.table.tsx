import { JSX } from "react";
import { Table } from "../../../../platform/ui/components";
import { useTranslation } from "react-i18next";
import { Command, useCommands } from "../../hooks";
import { CommandEditModal } from "../command-edit/command-edit.modal";

export type CommandsTableProps = {
  commands: Command[];
  isLoading: boolean;
  error: Error | null;
};

export const CommandsTable = ({
  commands,
  isLoading,
  error,
}: CommandsTableProps): JSX.Element => {
  const { t } = useTranslation();
  const { del } = useCommands();

  const handleEdit = (rowIndex: number) => {
    const command = commands?.[rowIndex];
    if (command) {
      CommandEditModal.show({ command });
    }
  };

  const handleDelete = (rowIndex: number) => {
    const command = commands?.[rowIndex];
    if (command) {
      del(command);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!commands) {
    return <div>No commands found</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Table
      headers={[
        t("Classe"),
        t("Élève"),
        t("Contact"),
        t("Articles"),
        t("Montant"),
        t("Moyen de Paiement"),
      ]}
      rows={commands?.map((command) => {
        const quantity = command.articles.reduce(
          (acc, article) => acc + article.quantity,
          0
        );
        const price = command.articles.reduce(
          (acc, article) => acc + article.article.price * article.quantity,
          0
        );
        return [
          command.student.class.name,
          `${command.student.firstName} ${command.student.lastName}`,
          command.parent,
          quantity,
          `${price.toFixed(2)} €`,
          t(command.paymentMethod ?? ""),
        ];
      })}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};
