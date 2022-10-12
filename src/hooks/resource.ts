import { AxiosResponse } from 'axios';
import { FilterParams } from 'core/interface/api';
import { Resource } from 'core/interface/models';
import { EditResource } from 'core/interface/resource';
import { queryClient } from 'index';
import { useMutation, useQuery } from 'react-query';
import {
  createResource,
  getResources,
  updateResource,
  getResourceById,
} from '../api';

export const useCreateResource = () => {
  const { mutateAsync: addResource } = useMutation(createResource, {
    onSuccess: () => {
      queryClient.invalidateQueries('resources');
      const message = 'success';
      alert(message);
    },
    onError: () => {
      alert('there was an error');
    },
  });

  return addResource;
};

export const useGetResource = (filterParams?: FilterParams<Resource>) => {
  return useQuery(
    ['resources', filterParams],
    () => getResources(filterParams),
    {
      select: (res) => {
        return res?.data;
      },
    }
  );
};

export const useUpdateResource = () => {
  const { mutateAsync } = useMutation<AxiosResponse<''>, any, EditResource>(
    (data) => updateResource(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('resources');
        queryClient.invalidateQueries('resource');
        const message = 'success';
        alert(message);
      },
      onError: () => {
        alert('there was an error');
      },
    }
  );

  return mutateAsync;
};

export const useGetResourceById = (id?: number) => {
  return useQuery(['resource', id], () => getResourceById(id), {
    select: (res) => {
      return res.data;
    },
    enabled: !!id,
  });
};
