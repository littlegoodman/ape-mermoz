import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { Teacher } from "../../teachers/hooks";
import { ClassesRepository } from "../infra/classes.repository";
import { useFilteredQuery } from "./use-filtered-query";

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
