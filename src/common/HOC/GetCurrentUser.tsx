import { FC, ReactNode, useEffect } from "react";
import { getCurrentUserThunk } from "core/store/thunk";
import { useAppDispatch } from "../../core/store";
import { userActions } from "../../core/store/slice";

interface Props {
  children: ReactNode;
}

export const GetCurrentUserWrapper: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
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
