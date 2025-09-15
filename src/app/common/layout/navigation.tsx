import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const Navigation = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navigateTo = (route: string) => {
    navigate(route);
  };

  return (
    <ul>
      <li>{t("L'École")}</li>
      <ul>
        <li>
          <button onClick={() => navigateTo("/professors")}>
            {t("Professeurs")}
          </button>
        </li>
        <li>
          <button onClick={() => navigateTo("/students")}>{t("Élèves")}</button>
        </li>
      </ul>
      <li>{t("Les Événements")}</li>
      <ul>
        <li>
          <button>{t("Chocolats 2025")}</button>
        </li>
      </ul>
    </ul>
  );
};
