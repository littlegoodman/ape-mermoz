import { BabyIcon, CandyIcon, GraduationCapIcon } from "lucide-react";
import {
  List,
  ListHeader,
  ListItem,
  ListItemButton,
} from "../../../platform/ui";
import { styled } from "../../../platform/ui/theme/stitches.config";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

// Styled components for elegant navigation
const StyledNavigation = styled(List, {
  variant: "navigation",
  background: "linear-gradient(135deg, $pink50 0%, $purple50 100%)",
  borderRadius: "$3",
  padding: "$3",
  border: "1px solid $pink200",
  boxShadow: "$soft",
});

const StyledListHeader = styled(ListHeader, {
  fontFamily: "$primary",
  fontWeight: "$bold",
  fontSize: "$m",
  color: "$slate700",
  letterSpacing: "$wide",
  textTransform: "uppercase",
  marginTop: "$3",
  marginBottom: "$2",
  padding: "$2 $3",
  background: "linear-gradient(135deg, $pink200 0%, $purple200 100%)",
  borderRadius: "$2",
  border: "1px solid $pink300",
  boxShadow: "$vlt",
});

const StyledListItemButton = styled(ListItemButton, {
  fontFamily: "$secondary",
  fontWeight: "$medium",
  fontSize: "$s",
  color: "$slate700",
  padding: "$2 $3",
  borderRadius: "$2",
  marginBottom: "$1",
  background: "linear-gradient(135deg, $white 0%, $pink25 100%)",
  border: "1px solid $pink200",
  transition: "all 0.2s ease-in-out",
  textDecoration: "none",
  "&:hover": {
    background: "linear-gradient(135deg, $pink200 0%, $purple200 100%)",
    borderColor: "$pink400",
    transform: "translateY(-1px)",
    boxShadow: "$soft",
    color: "$slate800",
  },
  "&.active": {
    background: "linear-gradient(135deg, $pink500 0%, $purple500 100%)",
    color: "$white",
    borderColor: "$pink500",
    boxShadow: "$md",
    fontWeight: "$bold",
  },
});

const StyledSubNav = styled(List, {
  variant: "subnav",
  margin: "$2 0 $2 $3",
  paddingLeft: "$3",
  padding: "$2",
});

const StyledSubNavButton = styled(ListItemButton, {
  fontFamily: "$secondary",
  fontWeight: "$medium",
  fontSize: "$xs",
  padding: "$1 $2",
  borderRadius: "$1",
  color: "$slate600",
  background: "transparent",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    background: "linear-gradient(135deg, $pink200 0%, $purple200 100%)",
    transform: "translateX(2px)",
    fontWeight: "$bold",
  },
  "&.active": {
    background: "linear-gradient(135deg, $pink400 0%, $purple400 100%)",
    color: "$white",
    fontWeight: "$bold",
    border: "1px solid $pink600",
    boxShadow: "$soft",
  },
});

export const Navigation = () => {
  const { t } = useTranslation();

  return (
    <StyledNavigation>
      <StyledListHeader noMarginTop>{t("L'École")}</StyledListHeader>
      <ListItem>
        <StyledListItemButton
          as={NavLink}
          startIcon={<GraduationCapIcon />}
          to="/teachers"
        >
          {t("Enseignants")}
        </StyledListItemButton>
        <StyledListItemButton
          as={NavLink}
          startIcon={<BabyIcon />}
          to="/students"
        >
          {t("Élèves")}
        </StyledListItemButton>
      </ListItem>
      <StyledListHeader>{t("Les Événements")}</StyledListHeader>
      <ListItem>
        <StyledListItemButton
          as={NavLink}
          startIcon={<CandyIcon />}
          to="/commands-summary"
        >
          {t("Chocolats 2025")}
        </StyledListItemButton>
        <StyledSubNav>
          <ListItem>
            <StyledSubNavButton
              as={NavLink}
              color="secondary"
              to="/commands-summary"
            >
              {t("Bon de commande")}
            </StyledSubNavButton>
          </ListItem>
          <ListItem>
            <StyledSubNavButton as={NavLink} color="secondary" to="/commands">
              {t("Détail des articles")}
            </StyledSubNavButton>
          </ListItem>
        </StyledSubNav>
      </ListItem>
    </StyledNavigation>
  );
};
