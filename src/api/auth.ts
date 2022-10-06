import { http } from 'core/api';
import { ApiResponse } from 'core/interface/api';
import { TokenResponse } from 'core/interface/redux';

export const getTokenApi = (
  code: string
): ApiResponse<TokenResponse> | null => {
  const url = '/get-token';
  return http.post(url, {
    code,
  });
};

export const getRefreshTokenApi = (
  refreshToken: string
): ApiResponse<TokenResponse> | null => {
  const url = '/update-token';
  return http.post(url, {
    refresh_token: refreshToken,
  });
};
