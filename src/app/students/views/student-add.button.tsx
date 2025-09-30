import { JSX } from "react";
import { Button } from "../../../platform/ui/components/button/button";
import { StudentEditModal } from "./student-edit.modal";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

export const StudentAddButton = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Button
      startIcon={<Plus size={16} />}
      onClick={() =>
        StudentEditModal.show({
          student: undefined,
        })
      }
    >
      {t("Ajouter un élève")}
    </Button>
  );
};
