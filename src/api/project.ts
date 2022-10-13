import { http } from 'core/api';
import { ApiResponse, FilterParams } from 'core/interface/api';
import { Project } from 'core/interface/models';
import {
  AddProject,
  IEditProject,
  ProjectsResponse,
} from 'core/interface/project';
import { TempProject } from 'core/interface/project';

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
