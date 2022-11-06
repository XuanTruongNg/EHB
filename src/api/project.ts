import { http } from "core/api";
import { ApiResponse, FilterParams } from "core/interface/api";
import { Project } from "core/interface/models";
import { AddProjectForm, IEditProject, ProjectsResponse, TempProject } from "core/interface/project";
import { AddResourcesToProject } from "core/interface/resource";

const url = "/rms/api/projects";

export const createProject = (data: AddProjectForm): ApiResponse<Project> => http.post(url, data);

export const getProjects = (params?: FilterParams<Project>): ApiResponse<ProjectsResponse> => http.get(url, { params });

export const getProjectById = (id?: number): ApiResponse<TempProject> => http.get(`${url}/${id}`);

export const updateProject = (id: number, data: IEditProject): ApiResponse<Project> =>
  http.put(`${url}/${id}`, data);

export const addResourcesToProject = (data: AddResourcesToProject): ApiResponse<Project> => {
  const { id, ...rest } = data;
  return http.post(`${url}/${id}/resources`, rest);
};
