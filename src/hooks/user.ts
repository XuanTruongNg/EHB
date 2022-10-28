import { useQuery } from "react-query";
import { getUserByIdApi } from "../api";

export const useGetUserById = (id: string) =>
  useQuery(["user", id], () => getUserByIdApi(id), {
    enabled: !!id,
    select: (res) => res?.data,
  });
