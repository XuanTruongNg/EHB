import { AxiosResponse } from 'axios';

export type ApiResponse<T> = Promise<AxiosResponse<T>>;

export interface GetListResponse<T> {
  count: number;
  data: T[];
}

export type FilterParams<T> = {
  page?: number;
  pageSize?: number;
  orderBy?: keyof T;
  order?: 'ASC' | 'DESC';
} & { [key: string]: string };
