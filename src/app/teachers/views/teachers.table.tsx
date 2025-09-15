import { JSX } from "react";
import { Table } from "../../../platform/ui/components/table/table";
import { useTeachers } from "../hooks/use-teachers.hook";
import { EditableTable } from "../../../platform/ui/components/table/editable-table";

export const TeachersTable = (): JSX.Element => {
  const { findAll } = useTeachers();
  const { data: teachers, isLoading, error } = findAll();

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
      headers={["Name", "Phone"]}
      rows={teachers?.map((teacher) => [teacher.name, teacher.phone])}
    />
  );
};
