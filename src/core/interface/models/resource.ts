import { CurrentProjectsOfResource } from './project';
import { Base } from './base';
import { Department } from './department';
import { HardSkill } from './hardSkill';
import { ResourceRole } from './resourceRole';

export interface Resource extends Pick<Base, 'id'> {
  name: string;
  code: string;
  remainBandwidth: number;
  yearsOfExperience: number;
  uuid: string;
  departments: Department;
  resourcesRoles: ResourceRole;
  hardSkills: HardSkill[];
  currentProjects: CurrentProjectsOfResource[];
  projectsEndDate: string[];
}

export interface ResourceInProject extends Pick<Resource, 'name' | 'code' | 'resourcesRoles'| 'hardSkills'| 'yearsOfExperience'> {
  joinedDate: string;
  endDate: string;
  allocatedBandwidth: number;
}