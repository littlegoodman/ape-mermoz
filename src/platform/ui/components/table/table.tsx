import { TableContainer } from "./table.style";
import { TableRow } from "./table-row";

export type TableProps = {
  headers: React.ReactNode[];
  rows: React.ReactNode[][];
  onEdit?: (rowIndex: number) => void;
  onDelete?: (rowIndex: number) => void;
};

export const Table = ({ headers, rows, onEdit, onDelete }: TableProps) => {
  return (
    <TableContainer>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <TableRow
            key={rowIndex}
            cells={row}
            onEdit={onEdit ? () => onEdit(rowIndex) : undefined}
            onDelete={onDelete ? () => onDelete(rowIndex) : undefined}
          />
        ))}
      </tbody>
    </TableContainer>
  );
};
