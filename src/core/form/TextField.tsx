import { Box, TextField, TextFieldProps } from '@mui/material';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import FieldWrapper from './FieldWrapper';

type ITextField = TextFieldProps & {
  name: string;
  title: string;
  width?: number;
  type?: string;
  disabled?: boolean;
  defaultValue?: string | number;
  rules?: Exclude<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >;
  labelWidth?: string;
  labelMargin?: string;
};

const TextFieldC: React.FunctionComponent<ITextField> = ({
  name,
  title,
  defaultValue = '',
  width = 400,
  type = 'text',
  disabled = false,
  rules,
  labelWidth,
  labelMargin,
  ...rest
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FieldWrapper
      title={title}
      width={labelWidth}
      margin={labelMargin}
      name={name}
    >
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field }) => (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: errors ? '12px' : 0,
            }}
          >
            <TextField
              {...rest}
              {...field}
              disabled={disabled}
              type={type}
              sx={{ width: 400, ...rest.sx }}
              error={!!errors[name]}
              onChange={(event) =>
                field.onChange(
                  type === 'number' ? +event.target.value : event.target.value
                )
              }
              InputProps={{
                inputProps: { min: 0 },
                ...rest.InputProps,
              }}
            />
          </Box>
        )}
      />
    </FieldWrapper>
  );
};

export default TextFieldC;
