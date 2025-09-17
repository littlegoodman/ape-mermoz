import { JSX } from "react";
import { Button } from "../../../platform/ui/components/button/button";
import { StudentEditModal } from "./student-edit.modal";
import { Plus } from "lucide-react";

export const StudentAddButton = (): JSX.Element => {
  return (
    <Button
      onClick={() =>
        StudentEditModal.show({
          student: undefined,
        })
      }
    >
      <Plus size={16} />
    </Button>
  );
};
