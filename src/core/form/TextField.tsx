import { TextField, TextFieldProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type ITextField = TextFieldProps & {
  name: string;
};

const TextFieldC: React.FunctionComponent<ITextField> = ({
  name,
  defaultValue,
  ...rest
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={{ required: true }}
      render={({ field }) => <TextField {...field} {...rest} />}
    />
  );
};

export default TextFieldC;
