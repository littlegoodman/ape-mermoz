import { useTranslation } from "react-i18next";

export const TeachersNavigation = () => {
  const { t } = useTranslation();
  return (
    <ul>
      <li>{t("Professeurs")}</li>
      <li>{t("Élèves")}</li>
    </ul>
  );
};
