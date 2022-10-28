import { http } from "core/api";
import { ApiResponse } from "core/interface/api";
import { RoleResponse } from "core/interface/resourceRole";

export const getRole = (): ApiResponse<RoleResponse[]> => {
  const url = "/rms/api/roles";
  return http.get(url);
};
