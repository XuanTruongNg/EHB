import { FC, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getTokenApi } from "api/auth";
import { useAppDispatch } from "core/store";
import { userActions } from "core/store/slice";
import { saveAuthKeyIntoLocalStorage } from "util/";

const OAuthRedirect: FC = () => {
  const [params] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const code = params.get("code");
    if (code) {
      getTokenApi(code)?.then((res) => {
        saveAuthKeyIntoLocalStorage(res.data);
        dispatch(userActions.setToken(res.data));
      });
    }
  }, [dispatch, navigate, params]);

  return <>this is casdoor</>;
};

export default OAuthRedirect;
