import { Button, styled } from "../../../platform/ui";
import { Menu } from "lucide-react";
import logoApeMermoz from "../../../assets/logo-ape-mermoz.png";

export const appBarHeight = 60;
export const appSidebarWidth = 262;

const AppBarShell = styled("header", {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  display: "flex",
  flexDirection: "column",
  flexShrink: 0,
  zIndex: "$appbar",
  backgroundColor: "$background",
  color: "text",
  variants: {
    sidebarVisible: {
      true: {
        left: appSidebarWidth,
      },
    },
  },
});

const AppBarContent = styled("div", {
  boxSizing: "border-box",
  height: appBarHeight,
  display: "flex",
  alignItems: "center",
  position: "relative",
  borderBottom: "2px solid $neutralLightHover",
  gap: "$6",
});

const AppBarLeftSlot = styled("div", {
  display: "flex",
  flexGrow: 1,
  alignItems: "center",
  fontSize: "$appname",
  lineHeight: "$appname",
  fontWeight: "$regular",
  color: "$text",
  gap: "$3",
  paddingLeft: "$4",
  maxWidth: "50%",
  minWidth: 0,
});

export const AppBarRightSlot = styled("div", {
  display: "flex",
  flexGrow: 1,
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "$3",
  paddingRight: "$4",
});

export const OpenNavigationButton = styled("div", {
  borderRight: "1px solid $neutralLightHover",
  height: "100%",
  padding: "0 $3",
  display: "flex",
  alignItems: "center",
});

const LogoImage = styled("img", {
  height: "40px",
  width: "auto",
  objectFit: "contain",
});

export type AppBarProps = {
  title?: string;
  sidebarVisible?: boolean;
  onSidebarToggle?: () => void;
};

export const AppBar = ({
  title,
  sidebarVisible,
  onSidebarToggle,
}: AppBarProps) => {
  return (
    <AppBarShell sidebarVisible={sidebarVisible} data-testid="app-bar">
      <AppBarContent>
        {!sidebarVisible && onSidebarToggle && (
          <OpenNavigationButton>
            <Button variant="light" color="neutral" onClick={onSidebarToggle}>
              <Menu />
            </Button>
          </OpenNavigationButton>
        )}
        <AppBarLeftSlot>
          <h1>{title}</h1>
        </AppBarLeftSlot>
        <AppBarRightSlot>
          <LogoImage src={logoApeMermoz} />
        </AppBarRightSlot>
      </AppBarContent>
    </AppBarShell>
  );
};
