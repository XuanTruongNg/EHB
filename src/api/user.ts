import { http } from "../core/api";

export const getUserByIdApi = async (id: string) => {
  try {
    //TODO: provide user response interface in the future
    const res = await http.get(`/users/${id}`);
    return res;
  } catch (error) {
    return null;
  }
};
