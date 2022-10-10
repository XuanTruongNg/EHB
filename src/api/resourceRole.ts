import { http } from 'core/api';
import { config } from 'core/constant/config';
import { ApiResponse } from 'core/interface/api';
import { RoleResponse } from 'core/interface/resourceRole';

export const getRole = (): ApiResponse<RoleResponse[]> => {
  const url = `${config.SERVER_URL}/resource-roles`;
  return http.get(url);
};
