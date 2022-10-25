import { AxiosResponse } from 'axios';
import { EditParam, FilterParams } from 'core/interface/api';
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
      alert('success');
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

// TODO: Error handling for validation
export const useUpdateResource = () => {
  const { mutateAsync } = useMutation<
    AxiosResponse<''>,
    any,
    EditParam<EditResource>
  >(({ id, data }) => updateResource(id, data), {
    onSuccess: () => {
      queryClient.invalidateQueries('resources');
      queryClient.invalidateQueries('resource');
      alert('success');
    },
    onError: (err) => {
      alert('there was an error');
    },
  });

  return mutateAsync;
};

export const useGetResourceById = (id?: number) => {
  return useQuery(['resource', id], () => getResourceById(id), {
    select: (res) => {
      return res.data;
    },
    enabled: !!id && id > -1,
  });
};
