import { JSX } from "react";
import { Button } from "../../../platform/ui/components/button/button";
import { TeacherEditModal } from "./teacher-edit.modal";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

export const TeacherAddButton = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Button
      startIcon={<Plus size={16} />}
      onClick={() =>
        TeacherEditModal.show({
          teacher: undefined,
        })
      }
    >
      {t("Ajouter un enseignant")}
    </Button>
  );
};
