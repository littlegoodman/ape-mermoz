import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TeachersRepository } from "../../../platform/repositories/teachers.repository";
import { useFilteredQuery } from "../../common/hooks";

export type Teacher = {
  id: number;
  name: string;
  phone: string;
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

  const findById = (params: { id: string }) =>
    useQuery<Teacher | undefined>({
      queryKey: [...keys, "findById", params.id],
      queryFn: () => teachers.findById(params.id),
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

  return { findAll, findById, upsert, del };
};
