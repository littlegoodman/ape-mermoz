import { LoaderCircleIcon } from "lucide-react";
import { keyframes, styled } from "../../theme";

const Container = styled("div", {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "$white",
});

const rotate = keyframes({
  "0%": { rotate: "0deg" },
  "100%": { rotate: "1turn" },
});

export const Spinner = styled(LoaderCircleIcon, {
  fill: "currentColor",
  animationDuration: ".69s",
  animationFillMode: "forwards",
  animationIterationCount: "infinite",
  animationName: `${rotate}`,
  animationTimingFunction: "linear",
});

export const BigSpinner = () => (
  <Spinner
    data-testid="loading"
    css={{
      position: "absolute",
      top: "50%",
      left: "50%",
      fontSize: "$xl",
      fill: "$primary",
    }}
  />
);

export const Loader = () => (
  <Container>
    <BigSpinner />
  </Container>
);

const Overlay = styled("div", {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 10000,
  background: "rgba(255, 255, 255, 0.4)",
});

export const LoadingOverlay = () => (
  <Overlay>
    <BigSpinner />
  </Overlay>
);
