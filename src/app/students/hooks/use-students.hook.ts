import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { StudentsRepository } from "../infra/students.repository";
import { useFilteredQuery } from "../../common/hooks";

export type Student = {
  id: number;
  firstName: string;
  lastName: string;
  class: string;
};

const students = StudentsRepository.load();

export const useStudents = () => {
  const client = useQueryClient();
  const keys = ["students"];

  const findAll = (filter?: string) =>
    useFilteredQuery<Student[], { filter: string }>({
      queryKey: [...keys, "findAll"],
      queryFn: (params) => students.findAll(params),
      filter,
    });

  const { mutate: upsert } = useMutation({
    mutationFn: (student: Student & { id?: Student["id"] }) =>
      students.upsert(student),
    onSuccess: () => client.invalidateQueries({ queryKey: [...keys] }),
  });

  const { mutate: del } = useMutation({
    mutationFn: (student: Student) => students.delete(student),
    onSuccess: () => client.invalidateQueries({ queryKey: [...keys] }),
  });

  return { findAll, upsert, del };
};
