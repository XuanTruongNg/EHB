import { User } from '../../models';

export interface TokenResponse {
  access_token: string;
  id_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export interface UserState {
  isTriedLogin: boolean;
  user: User | null;
  token: TokenResponse | null;
}
