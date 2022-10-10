import { useMutation } from 'react-query';
import { createResource } from '../api';
import { AddResource } from 'core/interface/resource';
import { queryClient } from 'index';

export const useCreateResource = () => {
  const { mutate: addResource } = useMutation(createResource, {
    onSuccess: (data: AddResource) => {
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
