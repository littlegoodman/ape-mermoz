import { JSX } from "react";
import { useTeachers } from "../hooks/use-teachers.hook";
import { Button } from "../../../platform/ui/components/button";
import { TeacherEditionModal } from "./teacher-edition.modal";

export const AddTeacherButton = (): JSX.Element => {
  const { create } = useTeachers();

  return (
    <Button
      onClick={() =>
        TeacherEditionModal.show({
          teacher: undefined,
        })
      }
    >
      Add Teacher
    </Button>
  );
};
