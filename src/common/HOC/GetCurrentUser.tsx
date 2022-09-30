import { getCurrentUserThunk } from 'core/store/thunk';
import * as React from 'react';
import { CustomFC } from '../../core/interface/component';
import { store, useAppDispatch } from '../../core/store';
import { userActions } from '../../core/store/slice';
import { getAuthKeyFromLocalStorage } from '../../util/localStorage';
interface GetCurrentUserWrapperProps extends CustomFC {}

export const GetCurrentUserWrapper: React.FC<GetCurrentUserWrapperProps> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    // This is temporary solution, we can change it later
    const token = getAuthKeyFromLocalStorage();
    if (token) {
      dispatch(getCurrentUserThunk());
    } else {
      dispatch(userActions.setIsTriedLogin(true));
    }
  }, [dispatch]);

  return <>{children}</>;
};
