import { GetListResponse } from './api';
import { Project } from './models';
import { Resource } from './models/resource';

export interface ResourcesResponse extends GetListResponse<Resource> {}

export interface AddResource
  extends Pick<Resource, 'name' | 'uuid' | 'yearsOfExperience'> {
  roleId: number;
  departmentId: number;
  hardSkillIds: number[];
}
export interface EditResource
  extends Pick<Resource, 'name' | 'id' | 'yearsOfExperience'> {
  departmentId: number;
  roleId: number;
  code?: string;
  hardSkillIds: number[];
}

export interface AddResourcesToProject extends Pick<Project, 'id'> {
  resourceIdList: number[];
}

export interface FilterResources
  extends Pick<AddResource, 'roleId' | 'hardSkillIds'> {
  yearsOfExperience: number[];
}

export interface SearchResourcesParams {
  roleId: number;
  skillIdList: number[];
  minExp: number;
  maxExp: number;
}
