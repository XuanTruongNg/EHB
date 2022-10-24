import { http } from 'core/api';
import { ApiResponse, FilterParams } from 'core/interface/api';
import { Project } from 'core/interface/models';
import {
  AddProject,
  IEditProject,
  ProjectsResponse,
} from 'core/interface/project';
import { TempProject } from 'core/interface/project';
import { AddResourcesToProject } from 'core/interface/resource';

const url = '/rms/api/projects';

export const createProject = (data: AddProject): ApiResponse<Project> => {
  return http.post(url, data);
};

export const getProjects = (
  params?: FilterParams<Project>
): ApiResponse<ProjectsResponse> => {
  return http.get(url, { params });
};

export const getProjectById = (id?: number): ApiResponse<TempProject> => {
  return http.get(`${url}/${id}`);
};

export const updateProject = (
  id: number,
  data: IEditProject
): ApiResponse<Project> => {
  return http.put(`${url}/${id}`, data);
};

export const addResourcesToProject = (
  data: AddResourcesToProject
): ApiResponse<Project> => {
  const { id, ...rest } = data;
  return http.post(`${url}/${id}/resources`, rest);
};
