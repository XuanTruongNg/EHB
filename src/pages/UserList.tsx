import { FC } from "react";
import { Outlet } from "react-router-dom";

const UserList: FC = () => (
  <>
    this is user list
    <Outlet />
  </>
);

export default UserList;
