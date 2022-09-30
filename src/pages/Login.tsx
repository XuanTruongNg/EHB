import { Button } from '@mui/material';
import { loginApi } from 'api/auth';
import { useAppSelector } from 'core/store';
import { selectUserStore } from 'core/store/selector';
import { saveAuthKeyIntoLocalStorage } from 'util/localStorage';

interface LoginProps {}

const Login: React.FunctionComponent<LoginProps> = () => {
  const { user } = useAppSelector(selectUserStore);
  const onLogin = async () => {
    const res = await loginApi();
    if (res) {
      saveAuthKeyIntoLocalStorage(res.token);
      window.location.reload();
    }
  };

  return (
    <>
      {!user?.id && (
        <Button variant="outlined" onClick={onLogin}>
          Login
        </Button>
      )}
    </>
  );
};

export default Login;
