export type TableRowProps = {
  children: React.ReactNode;
};

export const TableRow = ({ children }: TableRowProps) => {
  return <tr>{children}</tr>;
};
