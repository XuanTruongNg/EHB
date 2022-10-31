import { AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { EditParam, FilterParams } from "core/interface/api";
import { Resource } from "core/interface/models";
import { EditResourceForm } from "core/interface/resource";
import { queryClient } from "index";
import { createResource, getResources, updateResource, getResourceById } from "../api";

export const useCreateResource = () => {
  const { mutateAsync: addResource } = useMutation(createResource, {
    onSuccess: () => {
      queryClient.invalidateQueries("resources");
      alert("success");
    },
    onError: () => {
      alert("there was an error");
    },
  });

  return addResource;
};

export const useGetResource = (filterParams?: FilterParams<Resource>) => {
  const { data: resources, isFetching } = useQuery(["resources", filterParams], () => getResources(filterParams), {
    select: (res) => res?.data,
  });
  return { resources, isFetching };
};

// TODO: Error handling for validation
export const useUpdateResource = () => {
  const { mutateAsync } = useMutation<AxiosResponse<"">, unknown, EditParam<EditResourceForm>>(
    ({ id, data }) => updateResource(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("resources");
        queryClient.invalidateQueries("resource");
        alert("success");
      },
      onError: () => {
        alert("there was an error");
      },
    }
  );

  return mutateAsync;
};

export const useGetResourceById = (id?: number) => {
  const { data: resource, isFetching } = useQuery(["resource", id], () => getResourceById(id), {
    select: (res) => res.data,
    enabled: !!id && id > -1,
  });
  return { resource, isFetching };
};
