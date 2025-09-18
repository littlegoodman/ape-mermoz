import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TeachersRepository } from "../infra/teachers.repository";
import { useFilteredQuery } from "../../common/hooks";

export type Teacher = {
  id: number;
  firstName: string;
  lastName: string;
  class: string;
};

const teachers = TeachersRepository.load();

export const useTeachers = () => {
  const client = useQueryClient();
  const keys = ["teachers"];

  const findAll = (filter?: string) =>
    useFilteredQuery<Teacher[], { filter: string }>({
      queryKey: [...keys, "findAll"],
      queryFn: (params) => teachers.findAll(params),
      filter,
    });

  const { mutate: upsert } = useMutation({
    mutationFn: (teacher: Teacher & { id?: Teacher["id"] }) =>
      teachers.upsert(teacher),
    onSuccess: () => client.invalidateQueries({ queryKey: [...keys] }),
  });

  const { mutate: del } = useMutation({
    mutationFn: (teacher: Teacher) => teachers.delete(teacher),
    onSuccess: () => client.invalidateQueries({ queryKey: [...keys] }),
  });

  return { findAll, upsert, del };
};
