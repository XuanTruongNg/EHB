import { useParams } from 'react-router-dom';

interface UserDetailProps {}

const UserDetail: React.FunctionComponent<UserDetailProps> = () => {
  const { id } = useParams<{ id: string }>();
  return <>User details with ${id}</>;
};

export default UserDetail;
