import { FilterParams } from 'core/interface/api';
import { Project } from 'core/interface/models';
import { queryClient } from 'index';
import { useMutation, useQuery } from 'react-query';
import { createProject, getProjects } from '../api';

export const useCreateProject = () => {
  const { mutate: addProject } = useMutation(createProject, {
    onSuccess: () => {
      const message = 'success';
      alert(message);
    },
    onError: () => {
      alert('there was an error');
    },
    onSettled: () => {
      queryClient.invalidateQueries('projects');
    },
  });

  return addProject;
};

export const useGetProject = (filterParams?: FilterParams<Project>) => {
  return useQuery(
    ['projects', filterParams],
    () => getProjects(filterParams),
    {
      select: (res) => {
        return res?.data;
      },
    }
  );
};
