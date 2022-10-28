import { Base } from "./base";

export interface OnGoingProject extends Base {
  code: string;
  projectName: string;
  assignedResources: number;
  duration: string;
  burnRate: number;
}
