import { Outlet } from 'react-router-dom';

interface EmptyLayoutProps {}

const EmptyLayout: React.FunctionComponent<EmptyLayoutProps> = () => {
  return (
    <>
      this is empty layout
      <Outlet />
    </>
  );
};

export default EmptyLayout;
