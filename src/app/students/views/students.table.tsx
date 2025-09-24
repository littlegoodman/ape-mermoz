import { JSX } from "react";
import { Table } from "../../../platform/ui/components";
import { Student, useStudents } from "../hooks/use-students.hook";
import { StudentEditModal } from "./student-edit.modal";
import { useTranslation } from "react-i18next";

export type StudentsTableProps = {
  students: Student[];
  isLoading: boolean;
  error: Error | null;
};

export const StudentsTable = ({
  students,
  isLoading,
  error,
}: StudentsTableProps): JSX.Element => {
  const { t } = useTranslation();
  const { del } = useStudents();

  const handleEdit = (rowIndex: number) => {
    const student = students?.[rowIndex];
    if (student) {
      StudentEditModal.show({ student });
    }
  };

  const handleDelete = (rowIndex: number) => {
    const student = students?.[rowIndex];
    if (student) {
      del(student);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!students) {
    return <div>No students found</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Table
      headers={[t("Classe"), t("Prénom"), t("Nom")]}
      rows={students?.map((student) => [
        student.class,
        student.firstName,
        student.lastName,
      ])}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};
