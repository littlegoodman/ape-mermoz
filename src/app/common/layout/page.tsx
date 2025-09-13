import React from "react";
import { AppBar } from "./app-bar";
import { Navigation } from "./navigation";
import { Button, styled } from "../../../platform/ui";
import { MenuIcon } from "lucide-react";

export type PageProps = {
  title?: string;
  children?: React.ReactNode;
  background?: "white" | "neutral" | "neutralLight";
};

const appBarHeight = 60;
const appSidebarWidth = 262;

const AppShell = styled("div", {
  display: "flex",
  flexGrow: 1,
  overflow: "auto",
  height: "100vh",
  variants: {
    background: {
      white: {
        background: "$white",
      },
      neutral: {
        background: "$neutralLight",
      },
      neutralLight: {
        background: "$gray200",
      },
    },
  },
  defaultVariants: {
    background: "neutralLight",
  },
});

const AppViewport = styled("div", {
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  height: "auto",
  paddingTop: appBarHeight,
});

const AppSidebar = styled("aside", {
  display: "flex",
  flexDirection: "column",
  position: "fixed",
  top: 0,
  width: appSidebarWidth,
  height: "100%",
  zIndex: 2,
  backgroundColor: "$white",
  boxSizing: "border-box",
  borderRight: "1px solid $neutralLightHover",
});

const SidebarHeader = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: appBarHeight,
  backgroundColor: "$white",
  borderBottom: "2px solid $neutralLightHover",
  padding: "0 $2 0 $4",
  flexShrink: 0,
  boxSizing: "border-box",
});

const AppNavigation = styled("nav", {
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  minHeight: 0,
});

const NavigationScrollArea = styled("div", {
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  overflowY: "auto",
  overflowX: "hidden",
  scrollbarWidth: "thin",
  padding: "$2 $4",
});

const MainViewport = styled("main", {
  display: "flex",
  flexDirection: "column",
  flex: "1 1 0px",
  position: "relative",
  variants: {
    sidebarVisible: {
      true: {
        marginLeft: appSidebarWidth,
      },
    },
  },
});

export function Page({
  title,
  children,
  background = "neutralLight",
}: PageProps) {
  const [sidebarVisible, setSidebarVisible] = React.useState(true);
  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  return (
    <AppShell background={background}>
      {sidebarVisible && (
        <AppSidebar>
          <SidebarHeader>
            <Button onClick={toggleSidebar}>
              <MenuIcon />
            </Button>
          </SidebarHeader>
          <AppNavigation>
            <NavigationScrollArea>
              <Navigation />
            </NavigationScrollArea>
          </AppNavigation>
        </AppSidebar>
      )}
      <AppBar
        title={title}
        sidebarVisible={sidebarVisible}
        onSidebarToggle={toggleSidebar}
      />
      <AppViewport>
        <MainViewport sidebarVisible={sidebarVisible}>{children}</MainViewport>
      </AppViewport>
    </AppShell>
  );
}
