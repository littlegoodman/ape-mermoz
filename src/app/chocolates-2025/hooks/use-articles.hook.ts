import { useQuery } from "@tanstack/react-query";
import { ArticlesRepository } from "../infra/articles.repository";

export type Article = {
  id: number;
  name: string;
  description: string;
  price: number;
  preferentialPrice: number;
};

const repository = ArticlesRepository.load();

export const useArticles = () => {
  const keys = ["articles"];

  const findAll = () =>
    useQuery<Article[]>({
      queryKey: [...keys, "findAll"],
      queryFn: () => repository.findAll(),
    });

  return { findAll };
};
