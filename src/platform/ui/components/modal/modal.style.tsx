import { styled } from "../../theme";

export const ModalOverlay = styled("div", {
  position: "fixed !important",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 9999,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const ModalContent = styled("div", {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  padding: "2rem",
  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
  maxWidth: "500px",
  width: "100%",
  maxHeight: "90vh",
  overflowY: "auto",
  "& h1, & h2": {
    marginBottom: "1rem",
    color: "#2f2f2f",
  },
  "& p": {
    marginBottom: "0.5rem",
    color: "#4f4f4f",
  },
  "& button": {
    marginTop: "1rem",
  },
  variants: {
    size: {
      s: {
        minWidth: "300px",
      },
      m: {
        minWidth: "500px",
      },
      l: {
        minWidth: "1000px",
      },
    },
  },
});
