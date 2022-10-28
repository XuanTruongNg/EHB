import { GetListResponse } from "./api";
import { Project } from "./models";
import { Resource } from "./models/resource";

export type ResourcesResponse = GetListResponse<Resource>;

export interface AddResourceForm
  extends Pick<Resource, "name" | "uuid" | "yearsOfExperience" | "phoneNumber" | "email" | "displayName" | "avatar"> {
  departmentId: number;
  roleIds: number[];
  hardSkillIds: number[];
}
export interface EditResourceForm
  extends Pick<Resource, "name" | "yearsOfExperience" | "phoneNumber" | "email" | "displayName" | "avatar"> {
  departmentId: number;
  roleIds: number[];
  hardSkillIds: number[];
}

export interface AddResourcesToProject extends Pick<Project, "id"> {
  resourceIdList: number[];
}

//TODO change roleId to number[] when backend update api
export interface FilterResourcesForm extends Pick<AddResourceForm, "hardSkillIds"> {
  roleId: number;
  yoeRange: number[];
}

//TODO change roleId to number[] when backend update api
export interface SearchResourcesParams {
  roleId: number;
  skillIdList: number[];
  minExp: number;
  maxExp: number;
}
