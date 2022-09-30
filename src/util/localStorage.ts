import { KEYS } from 'core/constant/key';

export const saveAuthKeyIntoLocalStorage = (key: string) => {
  localStorage.setItem(KEYS.AUTH_KEY, key);
};

export const getAuthKeyFromLocalStorage = () => {
  return localStorage.getItem(KEYS.AUTH_KEY);
};

export const clearAuthKeyFromLocalStorage = () => {
  localStorage.removeItem(KEYS.AUTH_KEY);
};
