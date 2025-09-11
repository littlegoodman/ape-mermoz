import { JSX } from "react";
import { Table } from "../../../platform/ui/components/table";
import { useTeachers } from "../hooks/use-teachers.hook";

export const TeachersPage = (): JSX.Element => {
  return <TeachersTable />;
};

export const TeachersTable = (): JSX.Element => {
  const { data: teachers, isLoading, error } = useTeachers();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {teachers?.map((teacher, index) => (
          <tr key={index}>
            <td>{teacher.name}</td>
            <td>{teacher.phone}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
