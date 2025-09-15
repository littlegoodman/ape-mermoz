import { Table } from "./table";
import { Button } from "../button";
import { Edit, Trash2 } from "lucide-react";

export type EditableTableProps = {
  onEdit?: () => void;
  onDelete?: () => void;
  children: React.ReactNode;
};

export const EditableTable = ({
  onEdit,
  onDelete,
  children,
}: EditableTableProps) => {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
      <div style={{ display: "flex", gap: "4px", paddingTop: "8px" }}>
        {onEdit && (
          <Button onClick={onEdit}>
            <Edit size={16} />
          </Button>
        )}
        {onDelete && (
          <Button onClick={onDelete}>
            <Trash2 size={16} />
          </Button>
        )}
      </div>
      <Table>{children}</Table>
    </div>
  );
};
