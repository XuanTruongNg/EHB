import { useQuery } from "react-query";
import { getRole } from "../api";

export const useGetRole = () => {
  const { data: roles, isFetching } = useQuery(["resource-roles"], () => getRole(), {
    select: (res) => res?.data,
  });
  return { roles, isFetching };
};
