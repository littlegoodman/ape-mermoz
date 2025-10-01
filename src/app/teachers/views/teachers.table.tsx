import { JSX } from "react";
import { Table } from "../../../platform/ui/components/";
import { Teacher, useTeachers } from "../hooks/use-teachers.hook";
import { TeacherEditModal } from "./teacher-edit.modal";
import { useTranslation } from "react-i18next";

export type TeachersTableProps = {
  teachers: Teacher[];
  isLoading: boolean;
  error: Error | null;
};

export const TeachersTable = ({
  teachers,
  isLoading,
  error,
}: TeachersTableProps): JSX.Element => {
  const { t } = useTranslation();
  const { del } = useTeachers();

  const handleEdit = (rowIndex: number) => {
    const teacher = teachers?.[rowIndex];
    if (teacher) {
      TeacherEditModal.show({ teacher });
    }
  };

  const handleDelete = (rowIndex: number) => {
    const teacher = teachers?.[rowIndex];
    if (teacher) {
      del(teacher);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!teachers) {
    return <div>No teachers found</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Table
      headers={[t("Classe"), t("Titre"), t("Nom")]}
      rows={teachers?.map((teacher) => [
        teacher.class.name,
        teacher.title,
        teacher.lastName,
      ])}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};
