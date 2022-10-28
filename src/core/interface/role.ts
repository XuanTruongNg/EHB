import { ROLE_ADMIN, ROLE_EMPLOYEE, ROLE_PROJECT_MANAGER } from "core/constant/role";

export type Role = typeof ROLE_ADMIN | typeof ROLE_EMPLOYEE | typeof ROLE_PROJECT_MANAGER;
