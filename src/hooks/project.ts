import { FilterParams } from 'core/interface/api';
import { Project } from 'core/interface/models';
import { IEditProject } from 'core/interface/project';
import { queryClient } from 'index';
import { useMutation, useQuery } from 'react-query';
import {
  createProject,
  getProjectById,
  getProjects,
  updateProject,
} from '../api';

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
  return useQuery(['projects', filterParams], () => getProjects(filterParams), {
    select: (res) => {
      return res?.data;
    },
  });
};

interface Options {
  id?: number;
  enabled?: boolean;
}

export const useGetProjectById = ({ enabled = true, id }: Options) => {
  return useQuery(
    ['project', id],
    () => {
      if (!id) return;
      return getProjectById(id);
    },
    {
      select: (res) => {
        return res?.data;
      },
      enabled,
    }
  );
};

export const useUpdateProject = () => {
  const { mutate } = useMutation<any, any, IEditProject & { id: number }>(
    ({ id, ...rest }) => {
      return updateProject(id, rest);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('projects');
        queryClient.invalidateQueries('project');
        const message = 'success';
        alert(message);
      },
      onError: () => {
        alert('there was an error');
      },
    }
  );

  return mutate;
};
