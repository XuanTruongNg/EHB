import { User } from '../../models';

export interface UserState {
  isTriedLogin: boolean;
  user?: User;
}
