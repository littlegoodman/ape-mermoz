import { globalCss } from "./stitches.config";

export const applyGlobalStyles = globalCss({
  "*": {
    margin: 0,
    padding: 0,
    fontFamily: "inherit",
    fontSize: "inherit",
    lineHeight: "inherit",
  },
  html: {
    fontSize: "$base",
    backgroundColor: "$background",
    color: "$text",
  },
  body: {
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    textRendering: "optimizeLegibility",
    fontSize: "$base",
    lineHeight: "$m",
    letterSpacing: "$base",
    fontFamily: "$primary",
    backgroundColor: "$background",
    color: "$text",
  },

  ".nice-modal-overlay": {
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
  },

  ".nice-modal-content": {
    position: "relative",
    zIndex: 10000,
    bacdapkgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "2rem",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
    maxWidth: "90vw",
    maxHeight: "90vh",
    overflowY: "auto",
  },

  ".modal": {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "2rem",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
    maxWidth: "500px",
    width: "100%",
    maxHeight: "90vh",
    overflowY: "auto",
  },

  ".modal h1, .modal h2": {
    marginBottom: "1rem",
    color: "#2f2f2f",
  },

  ".modal p": {
    marginBottom: "0.5rem",
    color: "#4f4f4f",
  },

  ".modal button": {
    marginTop: "1rem",
  },
});
