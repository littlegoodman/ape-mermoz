import { Trash2 } from "lucide-react";
import {
  EditableTableRow as StyledEditableTableRow,
  ImmutableTableRow as StyledImmutableTableRow,
} from "./table-row.style";
import { Button } from "../button";

export type TableRowProps = {
  cells: React.ReactNode[];
  onEdit?: () => void;
  onDelete?: () => void;
};

export const TableRow = ({ cells, onEdit, onDelete }: TableRowProps) => {
  return onEdit || onDelete
    ? EditableTableRow({ cells, onEdit, onDelete })
    : ImmutableTableRow({ cells });
};

const ImmutableTableRow = ({ cells }: TableRowProps) => {
  return (
    <StyledImmutableTableRow>
      {cells.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </StyledImmutableTableRow>
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
