import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { TeachersRepository } from "../../../platform/repositories/teachers.repository";

export interface Teacher {
  name: string;
  phone: string;
}

const teachers = TeachersRepository.load();

export const useTeachers = (): UseQueryResult<Teacher[]> => {
  return useQuery<Teacher[]>({
    queryKey: ["teachers", "load"],
    queryFn: () => teachers.findAll(),
  });
};
