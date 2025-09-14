import { JSX } from "react";
import { Button } from "../../../platform/ui/components/button";
import { TeacherEditionModal } from "./teacher-edition.modal";
import { useTranslation } from "react-i18next";

export const AddTeacherButton = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Button
      onClick={() =>
        TeacherEditionModal.show({
          teacher: undefined,
        })
      }
    >
      {t("Ajouter un professeur")}
    </Button>
  );
};
