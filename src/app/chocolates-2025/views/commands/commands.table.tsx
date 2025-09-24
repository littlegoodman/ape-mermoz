import { JSX } from "react";
import { Table } from "../../../../platform/ui/components";
import { useTranslation } from "react-i18next";
import { Command, useCommands } from "../../hooks";
import { CommandEditModal } from "../command/command-edit.modal";

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
      headers={[t("Classe"), t("Élève"), t("Parent"), t("Quantité"), t("Prix")]}
      rows={commands?.map((command) => [
        command.student.class,
        `${command.student.firstName} ${command.student.lastName}`,
        command.parent,
        command.articles.reduce((acc, article) => acc + article.quantity, 0),
        command.articles.reduce(
          (acc, article) => acc + article.article.price * article.quantity,
          0
        ),
      ])}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};
