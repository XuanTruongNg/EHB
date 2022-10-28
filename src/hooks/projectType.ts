import { useQuery } from "react-query";
import { getProjectType } from "../api";

export const useGetProjectType = () => {
  const { data: projectTypes, isFetching } = useQuery(["project-types"], () => getProjectType(), {
    select: (res) => res?.data,
  });
  return { projectTypes, isFetching };
};
