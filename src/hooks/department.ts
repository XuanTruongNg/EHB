import { useQuery } from "react-query";
import { getDepartment } from "../api";

export const useGetDepartment = () => {
  const { data: departments, isFetching } = useQuery(["departments"], () => getDepartment(), {
    select: (res) => res?.data,
  });
  return { departments, isFetching };
};
