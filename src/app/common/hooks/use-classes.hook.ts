import { useQuery } from "@tanstack/react-query";
import { ClassesRepository } from "../infra/classes.repository";

export type SchoolClass = {
  id: number;
  name: string;
};

const classes = ClassesRepository.load();

export const useClasses = () => {
  const keys = ["classes"];

  const findAll = () =>
    useQuery<SchoolClass[]>({
      queryKey: [...keys, "findAll"],
      queryFn: () => classes.findAll(),
    });

  return { findAll };
};
