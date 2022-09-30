import { useQuery } from "react-query";
import { getUserByIdApi } from "../api";

export const useGetUserById = (id: string) => {
  return useQuery(["user", id], () => getUserByIdApi(id), {
    enabled: !!id,
    select: (res) => {
      return res?.data;
    },
  });
};
