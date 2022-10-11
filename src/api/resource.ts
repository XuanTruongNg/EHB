import { http } from 'core/api';
import { ApiResponse, FilterParams } from 'core/interface/api';
import { Resource } from 'core/interface/models';
import { AddResource, ResourcesResponse } from 'core/interface/resource';

const url = '/rms/api/resources';

export const createResource = (data: AddResource): ApiResponse<Resource> => {
  return http.post(url, data);
};

export const getResources = (
  params?: FilterParams<Resource>
): ApiResponse<ResourcesResponse> => {
  return http.get(url, { params });
};
