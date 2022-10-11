import {
  Typography,
  Box,
  Autocomplete,
  TextField,
  AutocompleteProps,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface option {
  value: number;
  label: string;
}

type IAutocomplete = Omit<
  AutocompleteProps<any, any, any, any>,
  'renderInput'
> & {
  name: string;
  options: option[];
  placeholder: string;
  title: string;
  width?: number;
  isMultiple?: boolean;
};

const AutocompleteC: React.FunctionComponent<IAutocomplete> = ({
  name,
  title,
  width = 400,
  defaultValue,
  placeholder,
  options,
  isMultiple,
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
        rules={{ required: true }}
        render={({ field }) => {
          return (
            <Autocomplete
              {...field}
              {...rest}
              sx={{ width }}
              disableClearable
              multiple={isMultiple}
              defaultValue={defaultValue}
              getOptionLabel={(option) => option.label}
              // isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(_, data) => {
                if (isMultiple) {
                  const multiple = data.map((item: option) => item.value);
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
