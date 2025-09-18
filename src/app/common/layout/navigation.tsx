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
            {t("Enseignants")}
          </button>
        </li>
        <li>
          <button onClick={() => navigateTo("/students")}>{t("Élèves")}</button>
        </li>
      </ul>
      <li>{t("Les Événements")}</li>
      <ul>
        <li>{t("Chocolats 2025")}</li>
        <ul>
          <li>
            <button onClick={() => navigateTo("/commands-summary")}>
              {t("Récapitulatif des commandes")}
            </button>
          </li>
          <li>
            <button onClick={() => navigateTo("/commands")}>
              {t("Commandes")}
            </button>
          </li>
        </ul>
      </ul>
    </ul>
  );
};
