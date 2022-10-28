import { FC } from "react";
import { useParams } from "react-router-dom";

const UserDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  return <>User details with ${id}</>;
};

export default UserDetail;
