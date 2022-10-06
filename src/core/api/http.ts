import { EnhancedStore } from '@reduxjs/toolkit';
import { getRefreshTokenApi } from 'api/auth';
import axios from 'axios';
import { KEYS } from 'core/constant';
import { RootState, Store } from 'core/store';
import { userActions } from 'core/store/slice';
import { saveAuthKeyIntoLocalStorage } from 'util/';
import { config } from '../constant/config';

let store: Store;

const http = axios.create({
  baseURL: config.GATEWAY_URL,
  withCredentials: true,
  headers: {
    [KEYS.HEADER_CASDOOR]: config.CASDOOR_CLIENT_ID,
  },
});

export const injectStore = (_store: EnhancedStore<RootState>) =>
  (store = _store);

http.interceptors.request.use((req) => {
  const token = store.getState().user.token?.access_token;
  if (token && req.headers)
    req.headers[KEYS.HEADER_AUTHORIZATION] = `Bearer ${token}`;

  return req;
});

http.interceptors.response.use(async (res) => {
  const { status } = res;
  if (status === 401) {
    const response = await getRefreshTokenApi(
      store.getState().user.token?.refresh_token || ''
    );

    if (response?.status === 401) {
      //TODO: logout user
      return res;
    }

    if (response) {
      saveAuthKeyIntoLocalStorage(response.data);
      store.dispatch(userActions.setToken(response.data));
    }
  }
  return res;
});

export { http };
