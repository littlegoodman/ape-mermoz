import { JSX } from "react";
import { Button } from "../../../platform/ui/components/button/button";
import { TeacherEditModal } from "./teacher-edit.modal";
import { Plus } from "lucide-react";

export const TeacherAddButton = (): JSX.Element => {
  return (
    <Button
      onClick={() =>
        TeacherEditModal.show({
          teacher: undefined,
        })
      }
    >
      <Plus size={16} />
    </Button>
  );
};
