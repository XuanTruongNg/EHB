import { AxiosResponse } from 'axios';

export type ApiResponse<T> = Promise<AxiosResponse<T>>;

export interface ObjectLiteral {
  [key: string]: any;
}

export interface GetListResponse<T> {
  count: number;
  data: T[];
}

export interface PaginationData<T> {
  page?: number;
  pageSize?: number;
  orderBy?: keyof T;
  order?: 'ASC' | 'DESC';
}

export interface FilterParams<T> extends ObjectLiteral, PaginationData<T> {}
