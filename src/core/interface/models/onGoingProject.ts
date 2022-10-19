import { Base } from './base';

export interface OnGoingProject extends Pick<Base, 'id'> {
  code: string;
  projectName: string;
  assignedResources: number;
  duration: string;
  burnRate: number;
}
