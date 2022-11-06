import { Base } from "./base";
import { ProjectType } from "./projectType";
import { Resource } from "./resource";
import { User } from "./user";

export interface Project extends Base {
  name: string;
  code: string;
  startDate: string;
  endDate: string;
  creator: User;
  status: string;
  projectManager: User;
  projectTypes: ProjectType;
  resourcesProjects: Resource[];
}

export type CurrentProjectsOfResource = Omit<
  Project,
  "resourcesProjects" | "projectTypes" | "creator" | "projectManager"
>;
