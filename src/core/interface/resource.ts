import { GetListResponse } from './api';
import { Project } from './models';
import { Resource } from './models/resource';

export interface ResourcesResponse extends GetListResponse<Resource> {}

export interface AddResource
  extends Pick<
    Resource,
    | 'name'
    | 'uuid'
    | 'yearsOfExperience'
    | 'phoneNumber'
    | 'email'
    | 'displayName'
    | 'avatar'
  > {
  departmentId: number;
  roleIds: number[];
  hardSkillIds: number[];
}
export interface EditResource
  extends Pick<
    Resource,
    | 'name'
    | 'yearsOfExperience'
    | 'phoneNumber'
    | 'email'
    | 'displayName'
    | 'avatar'
  > {
  departmentId: number;
  roleIds: number[];
  hardSkillIds: number[];
}

export interface AddResourcesToProject extends Pick<Project, 'id'> {
  resourceIdList: number[];
}

export interface FilterResources
  extends Pick<AddResource, 'roleIds' | 'hardSkillIds'> {
  yearsOfExperience: number[];
}

export interface SearchResourcesParams {
  roleId: number[];
  skillIdList: number[];
  minExp: number;
  maxExp: number;
}
