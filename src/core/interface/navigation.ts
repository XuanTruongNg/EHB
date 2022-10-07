import { Role } from 'core/interface/role';

export interface NavigationItem {
  acceptRoles: Role[];
  icon: JSX.Element;
  text: string;
  path: string;
}
