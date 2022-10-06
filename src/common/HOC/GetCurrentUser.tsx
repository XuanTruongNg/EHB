import { getCurrentUserThunk } from 'core/store/thunk';
import * as React from 'react';
import { CustomFC } from '../../core/interface/component';
import { useAppDispatch } from '../../core/store';
import { userActions } from '../../core/store/slice';
interface GetCurrentUserWrapperProps {}

export const GetCurrentUserWrapper: CustomFC<GetCurrentUserWrapperProps> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    // This is temporary solution, we can change it later
    (async () => {
      try {
        await dispatch(getCurrentUserThunk());
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(userActions.setIsTriedLogin(true));
      }
    })();
  }, [dispatch]);

  return <>{children}</>;
};
