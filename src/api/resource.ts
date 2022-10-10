import { http } from 'core/api';
import { config } from 'core/constant/config';
import { AddResource } from 'core/interface/resource';

export const createResource = async (data: AddResource) => {
  const { data: response } = await http.post(
    `${config.SERVER_URL}/resources`,
    data
  );
  return response.data;
};
