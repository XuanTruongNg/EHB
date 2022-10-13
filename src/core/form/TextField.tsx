import { TextField, TextFieldProps } from '@mui/material';
import { UI_DEFAULT_VALUE } from 'core/constant';
import { BaseInputProps } from 'core/interface/form/base';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import FieldWrapper from './FieldWrapper';

type ITextField = TextFieldProps &
  BaseInputProps & {
    name?: string;
    title?: string;
    type?: string;
    disabled?: boolean;
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
  rules,
  labelStyle,
  errorStyle,
  dir,
  ...rest
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FieldWrapper
      dir={dir}
      name={name}
      title={title}
      labelStyle={labelStyle}
      errorStyle={errorStyle}
    >
      {name ? (
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          rules={rules}
          render={({ field }) => (
            <TextField
              {...rest}
              {...field}
              sx={{ width: UI_DEFAULT_VALUE.INPUT_WIDTH, ...rest.sx }}
              error={!!errors[name]}
              onChange={(event) =>
                field.onChange(
                  rest.type === 'number'
                    ? +event.target.value
                    : event.target.value
                )
              }
              InputProps={{
                inputProps: { min: 0 },
                ...rest.InputProps,
              }}
            />
          )}
        />
      ) : (
        <TextField
          {...rest}
          sx={{ width: UI_DEFAULT_VALUE.INPUT_WIDTH, ...rest.sx }}
          InputProps={{
            inputProps: { min: 0 },
            ...rest.InputProps,
          }}
        />
      )}
    </FieldWrapper>
  );
};

export default TextFieldC;
