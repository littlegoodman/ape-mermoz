import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CommandsRepository } from "../infra/commands.repository";
import { Student } from "../../students/hooks/use-students.hook";
import { useFilteredQuery } from "../../common/hooks/use-filtered-query";
import { Article } from "./use-articles.hook";

export type Command = {
  id: string;
  parent: string;
  student: Student;
  articles: {
    article: Article;
    quantity: number;
  }[];
};

export type CommandsSummary = {
  articles: {
    article: Article;
    quantity: number;
    price: number;
    preferentialPrice: number;
  }[];
  totalPrice: number;
  totalPreferentialPrice: number;
};

const repository = CommandsRepository.load();

export const useCommands = () => {
  const client = useQueryClient();
  const keys = ["commands"];

  const getSummary = () =>
    useQuery<CommandsSummary>({
      queryKey: [...keys, "getSummary"],
      queryFn: () => repository.getCommandsSummary(),
    });

  const findAll = (filter?: string) =>
    useFilteredQuery<Command[], { filter: string }>({
      queryKey: [...keys, "findAll"],
      queryFn: (params) => repository.findAll(params),
      filter,
    });

  const { mutate: upsert } = useMutation({
    mutationFn: (command: Command & { id?: Command["id"] }) =>
      repository.upsert(command),
    onSuccess: () => client.invalidateQueries({ queryKey: [...keys] }),
  });

  const { mutate: del } = useMutation({
    mutationFn: (command: Command) => repository.delete(command),
    onSuccess: () => client.invalidateQueries({ queryKey: [...keys] }),
  });

  return { getSummary, findAll, upsert, del };
};
