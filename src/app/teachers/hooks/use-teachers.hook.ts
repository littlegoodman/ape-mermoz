import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TeachersRepository } from "../../../platform/repositories/teachers.repository";

export interface Teacher {
  name: string;
  phone: string;
}

const teachers = TeachersRepository.load();

export const useTeachers = () => {
  const client = useQueryClient();
  const keys = ["teachers"];

  const findAll = () =>
    useQuery<Teacher[]>({
      queryKey: [...keys, "findAll"],
      queryFn: () => teachers.findAll(),
    });

  const findById = (params: { id: string }) =>
    useQuery<Teacher | undefined>({
      queryKey: [...keys, "findById", params.id],
      queryFn: () => teachers.findById(params.id),
    });

  const { mutate: create } = useMutation({
    mutationFn: (teacher: Teacher) => teachers.create(teacher),
    onSuccess: () => client.invalidateQueries({ queryKey: [...keys] }),
  });

  return { findAll, findById, create };
};
