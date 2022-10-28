import { FC } from "react";
import { Outlet } from "react-router-dom";

const Home: FC = () => (
  <>
    this is home
    <div className="">
      <Outlet />
    </div>
  </>
);

export default Home;
