import { http } from 'core/api';
import { ApiResponse, FilterParams } from 'core/interface/api';
import { Resource } from 'core/interface/models';
import { EditResource } from '../core/interface/resource';
import {
  AddResource,
  ResourcesResponse,
  TempResource,
} from 'core/interface/resource';

const url = '/rms/api/resources';
// const url = 'resources';

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

export const getResourceById = (id?: number): ApiResponse<TempResource> => {
  return http.get(`${url}/${id}`);
};
