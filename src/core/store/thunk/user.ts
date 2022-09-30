import { AppThunk } from '..';
import { getAuthKeyFromLocalStorage } from 'util/localStorage';
import { userActions } from '../slice';

export const getCurrentUserThunk = (): AppThunk<Promise<void>> => {
  return async (dispatch) => {
    try {
      // TODO: get current user and dispatch action to update user into redux store here
      setTimeout(() => {
        const token = getAuthKeyFromLocalStorage();
        if (token) {
          dispatch(userActions.setUser({ id: '1' }));
          dispatch(userActions.setIsTriedLogin(true));
        } else {
          throw new Error('Token not found');
        }
      }, 1000);
    } catch (error) {
      throw error;
    }
  };
};
