import { useQuery } from 'react-query';
import { getProjectType } from '../api';

export const useGetProjectType = () => {
  return useQuery(['project-types'], () => getProjectType(), {
    select: (res) => {
      return res?.data;
    },
  });
};
