import { Autocomplete, TextField, AutocompleteProps } from '@mui/material';
import { UI_DEFAULT_VALUE } from 'core/constant';
import { BaseInputProps } from 'core/interface/form/base';
import { Controller, useFormContext } from 'react-hook-form';
import FieldWrapper from './FieldWrapper';

interface option {
  value: number;
  label: string;
}

type IAutocomplete = Omit<
  AutocompleteProps<any, any, any, any>,
  'renderInput'
> &
  BaseInputProps & {
    name: string;
    placeholder: string;
    title: string;
  };

const AutocompleteC: React.FunctionComponent<IAutocomplete> = ({
  name,
  title,
  defaultValue,
  placeholder,
  labelStyle,
  errorStyle,
  dir,
  ...rest
}) => {
  const { control, setValue } = useFormContext();

  return (
    <FieldWrapper
      dir={dir}
      name={name}
      title={title}
      labelStyle={labelStyle}
      errorStyle={errorStyle}
    >
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => {
          return (
            <Autocomplete
              {...field}
              {...rest}
              sx={{ width: UI_DEFAULT_VALUE.INPUT_WIDTH, ...rest.sx }}
              defaultValue={defaultValue}
              getOptionLabel={(option) => option.label}
              onChange={(_, data) => {
                if (rest.multiple) {
                  const multiple = data.map((item: option) => item.value);
                  setValue(name, multiple);
                } else {
                  setValue(name, data.value);
                }
              }}
              renderOption={(props, option) => (
                <li {...props} key={option.value}>
                  {option.label}
                </li>
              )}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder={placeholder}
                    fullWidth
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'disabled',
                    }}
                  />
                );
              }}
            />
          );
        }}
      />
    </FieldWrapper>
  );
};

export default AutocompleteC;
