import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { FormWrapper, TextFieldC } from "core/form";
import { useGetUserById } from "hooks";

interface FormDemoI {
  id: string;
}
const Demo: FC = () => {
  const methods = useForm<FormDemoI>({});
  const [id, setId] = useState("");
  const { data } = useGetUserById(id);
  const onSubmit = (data: FormDemoI) => {
    setId(data.id);
  };

  return (
    <div>
      <div className="">You loggin:</div>
      <FormWrapper onSubmit={onSubmit} methods={methods}>
        <TextFieldC name="id" title="id" type="text" dir="row" />
        <input type="submit" />
      </FormWrapper>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Demo;
