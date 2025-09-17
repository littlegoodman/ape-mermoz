export type ButtonProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
};

export const Button = ({ onClick, children }: ButtonProps) => {
  return <button onClick={(e) => onClick(e)}>{children}</button>;
};
