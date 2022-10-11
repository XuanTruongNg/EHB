import { GetListResponse } from './api';
import { HardSkill } from './models';
import { Base } from './models/base';
import { Resource } from './models/resource';

// TODO: remove when backend finish DTO
export interface TempResource extends Omit<Resource, 'resourcesHardSkills'> {
  resourcesHardSkills: ({
    hardSkills: HardSkill;
  } & Base)[];
}

export interface ResourcesResponse extends GetListResponse<TempResource> {}

export interface AddResource
  extends Pick<Resource, 'name' | 'uuid' | 'yearsOfExperience'> {
  departmentId: number;
  hardSkillIds: number[];
}
