import { useQuery } from 'react-query';
import { getHardSkill } from '../api';

export const useGetHardSkill = () => {
  return useQuery(['resource-roles'], () => getHardSkill(), {
    select: (res) => {
      return res?.data;
    },
  });
};
