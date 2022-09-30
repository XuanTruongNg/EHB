import { Outlet } from 'react-router-dom';

interface UserProps {}

const UserList: React.FunctionComponent<UserProps> = () => {
  return (
    <>
      this is user list
      <Outlet />
    </>
  );
};

export default UserList;
