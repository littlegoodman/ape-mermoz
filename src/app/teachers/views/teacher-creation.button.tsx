import { JSX } from "react";
import { Table } from "../../../platform/ui/components/table";
import { useTeachers } from "../hooks/use-teachers.hook";

export const AddTeacherButton = (): JSX.Element => {
  const { create } = useTeachers();

  return (
    <button
      onClick={() => create({ name: "John Doe", phone: "06 11 22 33 44" })}
    >
      Add Teacher
    </button>
  );
};
