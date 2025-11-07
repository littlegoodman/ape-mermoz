import { JSX } from "react";
import { Empty, Table } from "../../../platform/ui/components";
import { Student, useStudents } from "../hooks/use-students.hook";
import { StudentEditModal } from "./student-edit.modal";
import { useTranslation } from "react-i18next";
import { useClasses } from "../../common/hooks";
import { useTeachers } from "../../teachers/hooks";

export type StudentsTableProps = {
  students: Student[];
  isLoading: boolean;
  error: Error | null;
};

export const StudentsTable = ({
  students,
  error,
}: StudentsTableProps): JSX.Element => {
  const { t } = useTranslation();
  const { del } = useStudents();
  const { findAll: findAllClasses } = useClasses();
  const { findAll: findAllTeachers } = useTeachers();

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

  const { isLoading: isLoadingClasses, data: classes } = findAllClasses();
  const { isLoading: isLoadingTeachers, data: teachers } = findAllTeachers();

  if (isLoadingClasses || isLoadingTeachers) {
    return <Empty title={t("Chargement...")} />;
  }

  if (error) {
    return (
      <Empty title={t("Une erreur est survenue")} subtitle={error.message} />
    );
  }

  return (
    <Table
      headers={[t("Classe"), t("Enseignant"), t("Prénom"), t("Nom")]}
      rows={students?.map((student) => {
        const schoolClass = classes?.find((c) => c.id === student.class.id);
        const teacher = teachers?.find((t) => t.class.id === student.class.id);
        return [
          schoolClass?.name,
          `${teacher?.title} ${teacher?.lastName}`,
          student.firstName,
          student.lastName,
        ];
      })}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};
