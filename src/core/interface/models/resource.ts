import { CurrentProjectsOfResource } from './project';
import { Base } from './base';
import { Department } from './department';
import { HardSkill } from './hardSkill';
import { ResourceRole } from './resourceRole';

export interface Resource extends Base {
  uuid: string;
  code: string;
  name: string;
  displayName: string;
  phoneNumber: string;
  email: string;
  avatar: string;
  remainBandwidth: number;
  yearsOfExperience: number;
  departments: Department;
  roles: ResourceRole[];
  hardSkills: HardSkill[];
  currentProjects: CurrentProjectsOfResource[];
  projectsEndDate: string[];
}

export interface ResourceInProject
  extends Pick<
    Resource,
    'name' | 'code' | 'roles' | 'hardSkills' | 'yearsOfExperience'
  > {
  joinedDate: string;
  endDate: string;
  allocatedBandwidth: number;
}
