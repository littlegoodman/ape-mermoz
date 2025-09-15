import { JSX } from "react";
import { Table } from "../../../platform/ui/components/table/table";
import { useTeachers } from "../hooks/use-teachers.hook";
import { TeacherEditModal } from "./teacher-edit.modal";
import { useTranslation } from "react-i18next";

export const TeachersTable = (): JSX.Element => {
  const { t } = useTranslation();
  const { findAll, del } = useTeachers();
  const { data: teachers, isLoading, error } = findAll();

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
      headers={[t("Name"), t("Phone")]}
      rows={teachers?.map((teacher) => [teacher.name, teacher.phone])}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};
