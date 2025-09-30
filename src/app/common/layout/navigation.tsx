import {
  BabyIcon,
  CandyCaneIcon,
  CandyIcon,
  GraduationCapIcon,
} from "lucide-react";
import {
  List,
  ListHeader,
  ListItem,
  ListItemButton,
} from "../../../platform/ui";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";

export const Navigation = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navigateTo = (route: string) => {
    navigate(route);
  };

  return (
    <List variant="navigation">
      <ListHeader noMarginTop>{t("L'École")}</ListHeader>
      <ListItem>
        <ListItemButton
          as={NavLink}
          startIcon={<GraduationCapIcon />}
          to="/teachers"
        >
          {t("Enseignants")}
        </ListItemButton>
        <ListItemButton as={NavLink} startIcon={<BabyIcon />} to="/students">
          {t("Élèves")}
        </ListItemButton>
      </ListItem>
      <ListHeader>{t("Les Événements")}</ListHeader>
      <ListItem>
        <ListItemButton
          as={NavLink}
          startIcon={<CandyIcon />}
          to="/commands-summary"
        >
          {t("Chocolats 2025")}
        </ListItemButton>
        <List variant="subnav">
          <ListItem>
            <ListItemButton
              as={NavLink}
              color="secondary"
              to="/commands-summary"
            >
              {t("Bon de commande")}
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton as={NavLink} color="secondary" to="/commands">
              {t("Détail des articles")}
            </ListItemButton>
          </ListItem>
        </List>
      </ListItem>
    </List>
  );
};
