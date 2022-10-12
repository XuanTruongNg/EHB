import { TextField } from '@mui/material';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import FieldWrapper from './FieldWrapper';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';

type IDatePicker = Omit<
  DatePickerProps<unknown, unknown>,
  'value' | 'onChange' | 'renderInput'
> & {
  name: string;
  placeholder: string;
  inputWidth?: string;
  title: string;
  rules?: Exclude<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >;
  defaultValue?: string | number;
  labelWidth?: string;
  labelMargin?: string;
};

const DatePickerC: React.FunctionComponent<IDatePicker> = ({
  name,
  title,
  defaultValue = '',
  rules,
  placeholder,
  labelWidth,
  labelMargin,
  inputWidth = '150px',
  ...rest
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FieldWrapper
        title={title}
        width={labelWidth}
        margin={labelMargin}
        name={name}
      >
        <Controller
          {...rest}
          name={name}
          control={control}
          defaultValue={defaultValue}
          rules={rules}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              toolbarPlaceholder={placeholder}
              value={value}
              onChange={(value) => onChange(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!errors[name]}
                  sx={{ width: inputWidth }}
                />
              )}
            />
          )}
        />
      </FieldWrapper>
    </LocalizationProvider>
  );
};

export default DatePickerC;
