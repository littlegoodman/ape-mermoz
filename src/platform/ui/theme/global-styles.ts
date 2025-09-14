import { globalCss } from "./stitches.config";

export const applyGlobalStyles = globalCss({
  ".logo.vite:hover": {
    filter: "drop-shadow(0 0 2em #747bff)",
  },

  ".logo.react:hover": {
    filter: "drop-shadow(0 0 2em #61dafb)",
  },

  ":root": {
    fontFamily: "Inter, Avenir, Helvetica, Arial, sans-serif",
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: 400,
    color: "#0f0f0f",
    backgroundColor: "#f6f6f6",
    fontSynthesis: "none",
    textRendering: "optimizeLegibility",
    "-webkit-font-smoothing": "antialiased",
    "-moz-osx-font-smoothing": "grayscale",
    "-webkit-text-size-adjust": "100%",
  },

  ".container": {
    margin: 0,
    paddingTop: "10vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },

  ".logo": {
    height: "6em",
    padding: "1.5em",
    willChange: "filter",
    transition: "0.75s",
  },

  ".logo.tauri:hover": {
    filter: "drop-shadow(0 0 2em #24c8db)",
  },

  ".row": {
    display: "flex",
    justifyContent: "center",
  },

  a: {
    fontWeight: 500,
    color: "#646cff",
    textDecoration: "inherit",
  },

  "a:hover": {
    color: "#535bf2",
  },

  h1: {
    textAlign: "center",
  },

  "input, button": {
    borderRadius: "8px",
    border: "1px solid transparent",
    padding: "0.6em 1.2em",
    fontSize: "1em",
    fontWeight: 500,
    fontFamily: "inherit",
    color: "#0f0f0f",
    backgroundColor: "#ffffff",
    transition: "border-color 0.25s",
    boxShadow: "0 2px 2px rgba(0, 0, 0, 0.2)",
    outline: "none",
  },

  button: {
    cursor: "pointer",
  },

  "button:hover": {
    borderColor: "#396cd8",
  },

  "button:active": {
    borderColor: "#396cd8",
    backgroundColor: "#e8e8e8",
  },

  "#greet-input": {
    marginRight: "5px",
  },

  ".contacts-table": {
    marginTop: "2rem",
    padding: "1rem",
  },

  ".contacts-table h2": {
    marginBottom: "1rem",
    color: "#2f2f2f",
  },

  table: {
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto",
    borderCollapse: "collapse",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    overflow: "hidden",
  },

  "th, td": {
    padding: "1rem",
    textAlign: "left",
    borderBottom: "1px solid #e8e8e8",
  },

  th: {
    backgroundColor: "#f6f6f6",
    fontWeight: 600,
    color: "#2f2f2f",
  },

  "tr:hover": {
    backgroundColor: "#f9f9f9",
  },

  "tr:last-child td": {
    borderBottom: "none",
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
    backgroundColor: "#ffffff",
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

  "@media (prefers-color-scheme: dark)": {
    ":root": {
      color: "#f6f6f6",
      backgroundColor: "#2f2f2f",
    },

    "a:hover": {
      color: "#24c8db",
    },

    "input, button": {
      color: "#ffffff",
      backgroundColor: "#0f0f0f98",
    },

    "button:active": {
      backgroundColor: "#0f0f0f69",
    },

    ".contacts-table h2": {
      color: "#f6f6f6",
    },

    table: {
      backgroundColor: "#3f3f3f",
    },

    th: {
      backgroundColor: "#2f2f2f",
      color: "#f6f6f6",
    },

    td: {
      color: "#f6f6f6",
    },

    "th, td": {
      borderBottom: "1px solid #4f4f4f",
    },

    "tr:hover": {
      backgroundColor: "#4f4f4f",
    },

    ".nice-modal-content, .modal": {
      backgroundColor: "#3f3f3f",
    },

    ".modal h1, .modal h2": {
      color: "#f6f6f6",
    },

    ".modal p": {
      color: "#d0d0d0",
    },
  },
});
