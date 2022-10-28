import { ReactNode } from "react";
import { Role } from "core/interface/role";

export interface NavigationItem {
  acceptRoles: Role[];
  icon: ReactNode;
  text: string;
  path: string;
}
