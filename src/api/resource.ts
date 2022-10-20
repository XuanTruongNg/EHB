import { http } from 'core/api';
import { ApiResponse, FilterParams } from 'core/interface/api';
import { EditResource } from '../core/interface/resource';
import { AddResource, ResourcesResponse } from 'core/interface/resource';
import { Resource } from 'core/interface/models';

const url = '/rms/api/resources';

export const createResource = (data: AddResource): ApiResponse<Resource> => {
  return http.post(url, data);
};

export const getResources = (
  params?: FilterParams<Resource>
): ApiResponse<ResourcesResponse> => {
  return http.get(url, { params });
};

export const updateResource = (data: EditResource): ApiResponse<''> => {
  const { id, ...rest } = data;
  return http.put(`${url}/${id}`, rest);
};

export const getResourceById = (id?: number): ApiResponse<Resource> => {
  return http.get(`${url}/${id}`);
};
