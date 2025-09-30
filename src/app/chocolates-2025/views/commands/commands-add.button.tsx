import { JSX } from "react";
import { Button } from "../../../../platform/ui/components/button/button";
import { CommandEditModal } from "../command/command-edit.modal";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

export const CommandsAddButton = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Button
      startIcon={<Plus size={16} />}
      onClick={() =>
        CommandEditModal.show({
          command: undefined,
        })
      }
    >
      {t("Ajouter une commande")}
    </Button>
  );
};
