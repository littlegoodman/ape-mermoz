import { TableContainer } from "./table.style";
import { TableRow } from "./table-row";
import { TableHeaderRow } from "./table-header-row";
import { TableHeaderCell } from "./table-header-cell";
import { TableBody } from "./table-body";

export type TableProps = {
  headers: React.ReactNode[];
  rows: React.ReactNode[][];
  onEdit?: (rowIndex: number) => void;
  onDelete?: (rowIndex: number) => void;
};

export const Table = ({ headers, rows, onEdit, onDelete }: TableProps) => {
  return (
    <TableContainer>
      <TableHeaderRow>
        {headers.map((header, index) => (
          <TableHeaderCell key={index}>{header}</TableHeaderCell>
        ))}
      </TableHeaderRow>
      <TableBody>
        {rows.map((row, rowIndex) => (
          <TableRow
            key={rowIndex}
            cells={row}
            onEdit={onEdit ? () => onEdit(rowIndex) : undefined}
            onDelete={onDelete ? () => onDelete(rowIndex) : undefined}
          />
        ))}
      </TableBody>
    </TableContainer>
  );
};
