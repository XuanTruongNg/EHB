import { http } from 'core/api';
import { ApiResponse } from 'core/interface/api';
import { DepartmentResponse } from 'core/interface/department';

export const getDepartment = (): ApiResponse<DepartmentResponse[]> => {
  const url = '/rms/api/departments';
  return http.get(url);
};
