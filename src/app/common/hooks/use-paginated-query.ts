import { QueryKey, useQuery, UseQueryResult } from "@tanstack/react-query";
import React from "react";
import { useDebounce } from "./use-debounce";

export interface SortDescriptor {
  /** The key of the column to sort by. */
  column?: string | number;
  /** The direction to sort by. */
  direction?: "ascending" | "descending";
}

type PaginationMeta = {
  page: number;
  perPage: number;
  itemCount?: number;
  pageCount?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
};

export type PaginatedQueryResultMeta<S> = PaginationMeta & {
  sortDescriptor?: SortDescriptor;
  filter?: string;
  params?: S;
};

export type PaginatedQueryResult<T, S> = Omit<UseQueryResult, "data"> & {
  data?: T;
  meta: PaginatedQueryResultMeta<S>;
  setPage: (page: number) => void;
  setFilter: (value: string | undefined) => void;
  setParam: (
    key: string,
    value: string | number | string[] | undefined
  ) => void;
  setSort: (descriptor: SortDescriptor) => void;
  clearFilter: () => void;
};

export type PaginatedQueryParams<S> = S & {
  limit: number;
  offset: number;
  sortBy?: string;
  order?: "ascending" | "descending";
  filter?: string;
};

export type PaginatedQueryData<T> = {
  data: T;
  meta: PaginationMeta;
};

export type UsePaginatedQueryOptions<T, S> = {
  queryKey: QueryKey;
  queryFn: (
    params: PaginatedQueryParams<S>
  ) => PaginatedQueryData<T> | Promise<PaginatedQueryData<T>>;
  perPage?: number;
  enabled?: (params: PaginatedQueryParams<S>) => boolean;
};

export const usePaginatedQuery = <
  T,
  S extends Record<string, string | string[] | undefined>
>({
  queryKey,
  queryFn,
  perPage: perPageOption,
  params: defaultParams,
  enabled = () => true,
}: UsePaginatedQueryOptions<T, S> & { params?: S }): PaginatedQueryResult<
  T,
  S
> => {
  const perPage = perPageOption ?? 20;
  const [prevQueryKey, setPrevQueryKey] = React.useState(queryKey);
  const [page, setPage] = React.useState(1);
  const [params, setParams] = React.useState<S>(defaultParams ?? ({} as S));
  const [filter, setFilter] = React.useState<string | undefined>(undefined);
  const debouncedFilter = useDebounce<string | undefined>(filter, 500, () =>
    setPage(1)
  );
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>();

  if (JSON.stringify(queryKey) !== JSON.stringify(prevQueryKey)) {
    setPrevQueryKey(queryKey);
    setPage(1);
  }

  const setSort = (desc: SortDescriptor) => {
    setSortDescriptor(desc);
    setPage(1);
  };

  const setParam = (
    key: string,
    value: string | number | string[] | undefined
  ) => {
    setParams((state) => ({ ...state, [key]: value } as S));
    setPage(1);
  };

  const clearFilter = () => setFilter(undefined);

  const offset = perPage * (page - 1);
  const sortBy = sortDescriptor?.column?.toString();
  const order = sortDescriptor?.direction;

  const queryParams = {
    limit: perPage,
    offset,
    sortBy,
    order,
    filter: debouncedFilter,
    ...(params as S),
  };

  const { data: result, ...rest } = useQuery<PaginatedQueryData<T>>({
    queryKey: [
      ...queryKey,
      { offset, sortBy, order, params, filter: debouncedFilter },
    ],
    queryFn: () => queryFn(queryParams),
    enabled: enabled(queryParams),
  });

  const data = result ? result.data : undefined;
  const meta = result ? result.meta : {};

  return {
    data,
    ...rest,
    meta: {
      ...meta,
      page,
      perPage,
      sortDescriptor,
      filter,
      params,
    },
    setPage,
    setFilter,
    clearFilter,
    setParam,
    setSort,
  };
};
