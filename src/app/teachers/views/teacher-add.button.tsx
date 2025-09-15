import { JSX } from "react";
import { Button } from "../../../platform/ui/components/button/button";
import { TeacherEditModal } from "./teacher-edit.modal";
import { useTranslation } from "react-i18next";

export const TeacherAddButton = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Button
      onClick={() =>
        TeacherEditModal.show({
          teacher: undefined,
        })
      }
    >
      {t("Ajouter un professeur")}
    </Button>
  );
};
