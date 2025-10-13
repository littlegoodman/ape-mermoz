import { styled } from "../../theme";

export const InputLabel = styled("label", {
  display: "block",
  color: "$text",
  fontSize: "$s",
  lineHeight: "$s",
  fontWeight: "$bold",
  paddingBottom: 4,
});

export const MandatorySymbol = styled("div", {
  color: "$colors$red500",
});

export const FormHelperText = styled("span", {
  display: "block",
  color: "$text",
  fontSize: "$s",
  lineHeight: "$s",
  fontWeight: "$bold",
  paddingTop: 3,
});

export const FormControlContainer = styled("div", {
  display: "inline-flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "25ch",
  variants: {
    error: {
      true: {
        [`& ${FormHelperText}`]: {
          color: "$errorBorder",
        },
      },
    },
    width: {
      small: {
        width: "200px",
      },
      medium: {
        width: "300px",
      },
      large: {
        width: "400px",
      },
      full: {
        width: "100%",
      },
    },
  },
});
