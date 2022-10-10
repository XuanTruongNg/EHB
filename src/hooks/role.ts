import { useQuery } from 'react-query';
import { getRole } from '../api';

export const useGetRole = () => {
  return useQuery(['resource-roles'], () => getRole(), {
    select: (res) => {
      return res?.data;
    },
  });
};
