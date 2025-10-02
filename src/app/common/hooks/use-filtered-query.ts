import { UseQueryResult, QueryKey, useQuery } from "@tanstack/react-query";
import React from "react";
import { useDebounce } from "./use-debounce";

export type FilteredQueryResult<T, S> = Omit<UseQueryResult, "data"> & {
  data?: T;
  params: S;
  filter: string | undefined;
  setFilter: (value: string | undefined) => void;
  setParam: (
    key: string,
    value: string | number | string[] | undefined
  ) => void;
  clearFilter: () => void;
};

export type FilteredQueryParams<S> = S & {
  filter?: string;
};

export type UseFilteredQueryOptions<T, S> = {
  queryKey: QueryKey;
  queryFn: (params: FilteredQueryParams<S>) => T | Promise<T>;
  enabled?: (params: FilteredQueryParams<S>) => boolean;
};

export const useFilteredQuery = <
  T,
  S extends Record<string, string | string[] | undefined>
>({
  queryKey,
  queryFn,
  params: defaultParams,
  filter: defaultFilter,
  enabled = () => true,
}: UseFilteredQueryOptions<T, S> & {
  params?: S;
  filter?: string;
}): FilteredQueryResult<T, S> => {
  const [params, setParams] = React.useState<S>(defaultParams ?? ({} as S));
  const [filter, setFilter] = React.useState<string | undefined>(defaultFilter);
  const debouncedFilter = useDebounce<string | undefined>(filter);

  const setParam = (
    key: string,
    value: string | number | string[] | undefined
  ) => {
    setParams((state) => ({ ...state, [key]: value } as S));
  };

  const clearFilter = () => setFilter(undefined);

  const queryParams = {
    filter: debouncedFilter,
    ...(params as S),
  };

  const { data, ...rest } = useQuery<T>({
    queryKey: [...queryKey, { params, filter: debouncedFilter }],
    queryFn: () => queryFn(queryParams),
    enabled: enabled(queryParams),
  });

  return {
    data,
    ...rest,
    params,
    filter,
    setFilter,
    clearFilter,
    setParam,
  };
};
