import { Outlet } from 'react-router-dom';

interface EmptyLayoutProps {}

const EmptyLayout: React.FunctionComponent<EmptyLayoutProps> = () => {
  return <Outlet />;
};

export default EmptyLayout;
