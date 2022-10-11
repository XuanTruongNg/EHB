import { FilterParams } from 'core/interface/api';
import { Resource } from 'core/interface/models';
import { queryClient } from 'index';
import { useMutation, useQuery } from 'react-query';
import { createResource, getResources } from '../api';

export const useCreateResource = () => {
  const { mutate: addResource } = useMutation(createResource, {
    onSuccess: () => {
      const message = 'success';
      alert(message);
    },
    onError: () => {
      alert('there was an error');
    },
    onSettled: () => {
      queryClient.invalidateQueries('create');
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
