import { forwardRef } from "react";
import { styled } from "../../theme";

const ContentScrollAreaWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  minHeight: 0,
});

const ContentScrollArea = styled("div", {
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  overflow: "auto",
  padding: "$3",
});

export const ScrollArea = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode }
>(({ children }, ref) => (
  <ContentScrollAreaWrapper>
    <ContentScrollArea ref={ref}>{children}</ContentScrollArea>
  </ContentScrollAreaWrapper>
));
