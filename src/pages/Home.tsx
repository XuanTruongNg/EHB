import { Outlet } from 'react-router-dom';

interface HomeProps {}

const Home: React.FunctionComponent<HomeProps> = () => {
  return (
    <>
      this is home
      <div className="">
        <Outlet />
      </div>
    </>
  );
};

export default Home;
