import { JSX } from "react";
import { ImageWrapper, Title, Subtitle, Container } from "./empty.style";
import { Stack } from "../stack/stack";

export type EmptyProps = {
  image?: React.ReactNode;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
};

export const Empty = (props: EmptyProps): JSX.Element => {
  const { image, title, subtitle, children } = props;
  return (
    <Container>
      <Stack justify="center" align="center" spacing={3}>
        {image && <ImageWrapper>{image}</ImageWrapper>}
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
        {children}
      </Stack>
    </Container>
  );
};
