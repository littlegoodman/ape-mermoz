import { Trash2 } from "lucide-react";
import { StyledEditableTableRow, StyledTableRow } from "./table-row.style";
import { Button } from "../button";

export type TableRowProps = {
  cells: React.ReactNode[];
  onEdit?: () => void;
  onDelete?: () => void;
};

export const TableRow = ({ cells, onEdit, onDelete }: TableRowProps) => {
  return onEdit || onDelete
    ? EditableTableRow({ cells, onEdit, onDelete })
    : DisplayTableRow({ cells });
};

const DisplayTableRow = ({ cells }: TableRowProps) => {
  return (
    <StyledTableRow>
      {cells.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </StyledTableRow>
  );
};

const EditableTableRow = ({ cells, onEdit, onDelete }: TableRowProps) => {
  return (
    <StyledEditableTableRow onClick={() => onEdit?.()}>
      {cells.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
      {onDelete && (
        <td>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
            }}
          >
            <Trash2 size={16} />
          </Button>
        </td>
      )}
    </StyledEditableTableRow>
  );
};
