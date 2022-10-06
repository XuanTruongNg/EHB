import FormWrapper from 'core/form/FormWrapper';
import TextFieldC from 'core/form/TextField';
import { useAppSelector } from 'core/store';
import { selectUserRoleNames } from 'core/store/selector';
import { useGetUserById } from 'hooks';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface DemoProps {}
interface FormDemoI {
  id: string;
}
const Demo: React.FunctionComponent<DemoProps> = () => {
  const methods = useForm<FormDemoI>({});
  const userRoles = useAppSelector(selectUserRoleNames);
  console.log(userRoles);
  const [id, setId] = useState('');
  const { data } = useGetUserById(id);
  const onSubmit = (data: FormDemoI) => {
    setId(data.id);
  };

  return (
    <div>
      <div className="">You loggin:</div>
      <FormWrapper onSubmit={onSubmit} methods={methods}>
        <TextFieldC name="id" label="id" type="text" dir="" />
        <input type="submit" />
      </FormWrapper>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Demo;
