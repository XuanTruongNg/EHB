import { useMutation, useQuery } from "react-query";
import { FilterParams } from "core/interface/api";
import { Project } from "core/interface/models";
import { IEditProjectForm } from "core/interface/project";
import { queryClient } from "index";
import { addResourcesToProject, createProject, getProjectById, getProjects, updateProject } from "../api";

export const useCreateProject = () => {
  const { mutate: addProject } = useMutation(createProject, {
    onSuccess: () => {
      alert("success");
    },
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("projects");
    },
  });

  return addProject;
};

export const useGetProject = (filterParams?: FilterParams<Project>) => {
  const { data: projects, isFetching } = useQuery(["projects", filterParams], () => getProjects(filterParams), {
    select: (res) => res?.data,
  });

  return { projects, isFetching };
};

interface Options {
  id?: number;
  enabled?: boolean;
}

export const useGetProjectById = ({ enabled = true, id }: Options) => {
  const { data: project, isFetching } = useQuery(
    ["project", id],
    () => {
      if (id) return getProjectById(id);
      return undefined;
    },
    {
      select: (res) => res?.data,
      enabled,
    }
  );
  return { project, isFetching };
};

export const useUpdateProject = () => {
  const { mutate } = useMutation<unknown, unknown, IEditProjectForm & { id: number }>(
    ({ id, ...rest }) => updateProject(id, rest),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("projects");
        queryClient.invalidateQueries("project");
        alert("success");
      },
      onError: () => {
        alert("there was an error");
      },
    }
  );

  return mutate;
};

export const useAddResourcesToProject = () => {
  const { mutateAsync: addMembersToProject } = useMutation(addResourcesToProject, {
    onSuccess: () => {
      queryClient.invalidateQueries("projects");
      alert("success");
    },
    onError: () => {
      alert("there was an error");
    },
  });

  return addMembersToProject;
};
