import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getTokenApi } from 'api/auth';
import { saveAuthKeyIntoLocalStorage } from 'util/';
import { useAppDispatch } from 'core/store';
import { userActions } from 'core/store/slice';
interface CasdoorRedirectProps {}

const OAuthRedirect: React.FunctionComponent<CasdoorRedirectProps> = () => {
  const [params] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const code = params.get('code');
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
