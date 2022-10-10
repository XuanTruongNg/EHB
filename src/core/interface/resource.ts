import { DepartmentResponse } from './department';
import { HardSkillResponse } from './hardSkill';
import { RoleResponse } from './resourceRole';

export interface ResourceResponse {
  id: number;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  name: string;
  code: string;
  remainBandwidth: number;
  yearsOfExperience: number;
  uuid: string;
  departments: DepartmentResponse;
  resourcesRoles: RoleResponse;
  resourcesHardSkills: HardSkillResponse[];
}

export interface AddResource {
  resourceName: string;
  departmentId: number;
  hardSkillIds: number[];
  yearsOfExperience: number;
  uuid: string;
}
