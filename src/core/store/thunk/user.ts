import { AppThunk } from '..';
import { userActions } from '../slice';

export const getCurrentUserThunk = (): AppThunk<Promise<void>> => {
  return async (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      // TODO: get current user and dispatch action to update user into redux store here
      setTimeout(() => {
        if (getState().user.token) {
          //call api to get user info
          dispatch(
            userActions.setUser({
              uuid: '1',
              name: 'test',
              id: 1,
              createdAt: new Date().toString(),
              updatedAt: new Date().toString(),
              isDeleted: false,
            })
          );
          resolve();
        } else {
          reject(new Error('Token not found'));
        }
      }, 300);
    });
  };
};
