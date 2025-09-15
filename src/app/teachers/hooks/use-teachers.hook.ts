import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TeachersRepository } from "../../../platform/repositories/teachers.repository";

export type TeacherId = number;
export type Teacher = {
  id: TeacherId;
  name: string;
  phone: string;
};

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

  const { mutate: upsert } = useMutation({
    mutationFn: (teacher: Teacher & { id?: TeacherId }) =>
      teachers.upsert(teacher),
    onSuccess: () => client.invalidateQueries({ queryKey: [...keys] }),
  });

  const { mutate: del } = useMutation({
    mutationFn: (teacher: Teacher) => teachers.delete(teacher),
    onSuccess: () => client.invalidateQueries({ queryKey: [...keys] }),
  });

  return { findAll, findById, upsert, del };
};
