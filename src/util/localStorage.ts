import { KEYS } from "core/constant/key";
import { TokenResponse } from "core/interface/redux";

export const saveAuthKeyIntoLocalStorage = (key: TokenResponse) => {
  localStorage.setItem(KEYS.AUTH_STORAGE, JSON.stringify(key));
};

export const getAuthKeyFromLocalStorage = (): TokenResponse | null => {
  const data = localStorage.getItem(KEYS.AUTH_STORAGE);
  if (data) {
    return JSON.parse(data) as TokenResponse;
  }
  return null;
};

export const clearAuthKeyFromLocalStorage = () => {
  localStorage.removeItem(KEYS.AUTH_STORAGE);
};
