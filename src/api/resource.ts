import * as qs from "qs";
import { http } from "core/api";
import { ApiResponse, FilterParams } from "core/interface/api";
import { Resource } from "core/interface/models";
import { AddResourceForm, ResourcesResponse, EditResourceForm } from "core/interface/resource";

const url = "/rms/api/resources";

export const createResource = (data: AddResourceForm): ApiResponse<Resource> => http.post(url, data);

export const getResources = (params?: FilterParams<Resource>): ApiResponse<ResourcesResponse> =>
  http.get(url, {
    params,
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "comma" }),
  });

export const updateResource = (id: number, data: EditResourceForm): ApiResponse<""> => http.put(`${url}/${id}`, data);

export const getResourceById = (id?: number): ApiResponse<Resource> => http.get(`${url}/${id}`);
