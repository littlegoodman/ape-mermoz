export type TableProps = {
  children: React.ReactNode;
};
export const Table = ({ children }: TableProps) => {
  return <table>{children}</table>;
};
