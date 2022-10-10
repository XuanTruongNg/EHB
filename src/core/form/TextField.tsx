import { TextField, TextFieldProps } from '@mui/material';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import FieldWrapper from './FieldWrapper';

type ITextField = TextFieldProps & {
  name: string;
  title: string;
  defaultValue?: string | number;
  rules?: Exclude<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >;
};

const TextFieldC: React.FunctionComponent<ITextField> = ({
  name,
  title,
  defaultValue = '',
  type = 'text',
  rules,
  ...rest
}) => {
  const { control } = useFormContext();

  return (
    <FieldWrapper title={title}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field }) => (
          <TextField
            {...rest}
            {...field}
            type={type}
            sx={{ width: 400, ...rest.sx }}
            onChange={(event) =>
              field.onChange(
                type === 'number' ? +event.target.value : event.target.value
              )
            }
            InputProps={{
              inputProps: { min: 0 },
            }}
          />
        )}
      />
    </FieldWrapper>
  );
};

export default TextFieldC;
