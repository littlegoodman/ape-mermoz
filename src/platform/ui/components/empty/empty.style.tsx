import { styled } from "../../theme";

export const Container = styled("div", {
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

export const Title = styled("h2", {
  fontSize: "$xl",
  fontWeight: "$bold",
  textAlign: "center",
});

export const Subtitle = styled("div", {
  fontSize: "$m",
  textAlign: "center",
});

export const Image = styled("img", {});

export const ImageWrapper = styled("div", {
  textAlign: "center",
  marginBottom: 20,
});
