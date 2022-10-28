import { useQuery } from "react-query";
import { getHardSkill } from "../api";

export const useGetHardSkill = () => {
  const { data: hardSkills, isFetching } = useQuery(["resource-hard-skills"], () => getHardSkill(), {
    select: (res) => res?.data,
  });
  return { hardSkills, isFetching };
};
