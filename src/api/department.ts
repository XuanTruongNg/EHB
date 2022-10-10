import { http } from 'core/api';
import { config } from 'core/constant/config';
import { ApiResponse } from 'core/interface/api';
import { DepartmentResponse } from 'core/interface/department';

export const getDepartment = (): ApiResponse<DepartmentResponse[]> => {
  const url = `${config.SERVER_URL}/departments`;
  return http.get(url);
};
