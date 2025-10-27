import { styled } from "../../theme";

export const Container = styled("div", {
  paddingLeft: "$6",
  paddingRight: "$6",
  variants: {
    noGutters: {
      true: {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
  },
});
