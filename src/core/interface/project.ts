import { GetListResponse } from './api';
import { Resource } from './models';
import { Base } from './models/base';
import { Project } from './models/project';

// TODO: remove when backend finish DTO
export interface TempProject extends Omit<Project, 'resourcesProjects'> {
  resourcesProjects: ({
    resources: Resource;
    bandwidth: number;
    endDate: string;
    startDate: string;
    title: string;
  } & Base)[];
}

export interface ProjectsResponse extends GetListResponse<TempProject> {}

export interface AddProject
  extends Pick<Project, 'name' | 'code' | 'startDate' | 'endDate'> {
  projectManagerId: number;
  projectTypesId: number;
}

export interface IEditProject
  extends Pick<Project, 'code' | 'name' | 'startDate' | 'endDate'> {
  projectManagerId: number;
  projectTypesId: number;
}
