import { GetListResponse } from './api';
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
