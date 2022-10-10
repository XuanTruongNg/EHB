import {
  Typography,
  Box,
  Autocomplete,
  TextField,
  AutocompleteProps,
} from '@mui/material';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import { Option } from 'core/interface/selectOption';

type IAutocomplete = Omit<
  AutocompleteProps<any, any, any, any>,
  'renderInput'
> & {
  name: string;
  options: Option[];
  placeholder: string;
  title: string;
  width?: number;
  isMultiple?: boolean;
  rules?: Exclude<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >;
};

const AutocompleteC: React.FunctionComponent<IAutocomplete> = ({
  name,
  title,
  width = 400,
  defaultValue,
  placeholder,
  options,
  isMultiple,
  rules,
  ...rest
}) => {
  const { control, setValue } = useFormContext();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <Typography sx={{ width: '200px' }}>{title}</Typography>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field }) => {
          return (
            <Autocomplete
              {...field}
              {...rest}
              sx={{ ...rest.sx, width }}
              getOptionLabel={(option) => option.label}
              onChange={(_, data) => {
                if (isMultiple) {
                  const multiple = data.map((item: Option) => item.value);
                  setValue(name, multiple);
                } else {
                  setValue(name, data.value);
                }
              }}
              options={options}
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
    </Box>
  );
};

export default AutocompleteC;
