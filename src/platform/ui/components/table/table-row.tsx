import { Trash2Icon } from "lucide-react";
import {
  EditableTableRow as StyledEditableTableRow,
  ImmutableTableRow as StyledImmutableTableRow,
} from "./table-row.style";
import { Button } from "../button";
import { TableCell } from "./table-cell";

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
        <TableCell key={cellIndex}>{cell}</TableCell>
      ))}
    </StyledImmutableTableRow>
  );
};

const EditableTableRow = ({ cells, onEdit, onDelete }: TableRowProps) => {
  return (
    <StyledEditableTableRow onClick={() => onEdit?.()}>
      {cells.map((cell, cellIndex) => (
        <TableCell key={cellIndex}>{cell}</TableCell>
      ))}
      {onDelete && (
        <TableCell>
          <Button
            variant="light"
            size="small"
            icon={<Trash2Icon size={16} />}
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
            }}
          />
        </TableCell>
      )}
    </StyledEditableTableRow>
  );
};
