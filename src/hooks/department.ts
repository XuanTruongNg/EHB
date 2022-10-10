import { useQuery } from 'react-query';
import { getDepartment } from '../api';

export const useGetDepartment = () => {
  return useQuery(['departments'], () => getDepartment(), {
    select: (res) => {
      return res?.data;
    },
  });
};
