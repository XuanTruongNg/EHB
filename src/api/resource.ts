import { http } from 'core/api';
import { AddResource, ResourceResponse } from 'core/interface/resource';
import { ApiResponse } from 'core/interface/api';

export const createResource = (data: AddResource): ApiResponse<ResourceResponse> => {
  const url = '/rms/api/resources';
  return http.post(url, data);
};
