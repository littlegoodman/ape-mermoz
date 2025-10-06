import { styled } from "../../theme";

export const StackContainer = styled("div", {
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  variants: {
    spacing: {
      0: { gap: "$space$0" },
      1: { gap: "$space$1" },
      2: { gap: "$space$2" },
      3: { gap: "$space$3" },
      4: { gap: "$space$4" },
      5: { gap: "$space$5" },
      6: { gap: "$space$6" },
      7: { gap: "$space$7" },
    },
    align: {
      start: {
        alignItems: "flex-start",
      },
      center: {
        alignItems: "center",
      },
      end: {
        alignItems: "flex-end",
      },
      stretch: {
        alignItems: "stretch",
      },
    },
    justify: {
      start: {
        justifyContent: "flex-start",
      },
      center: {
        justifyContent: "center",
      },
      end: {
        justifyContent: "flex-end",
      },
      space: {
        justifyContent: "space-between",
      },
    },
  },
});
