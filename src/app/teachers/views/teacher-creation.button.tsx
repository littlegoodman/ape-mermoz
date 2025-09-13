import { JSX } from "react";
import { useTeachers } from "../hooks/use-teachers.hook";
import { Button } from "../../../platform/ui/components/button";

export const AddTeacherButton = (): JSX.Element => {
  const { create } = useTeachers();

  return (
    <Button
      onClick={() => create({ name: "John Doe", phone: "06 11 22 33 44" })}
    >
      Add Teacher
    </Button>
  );
};
