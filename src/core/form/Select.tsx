import { Box, Select, SelectProps } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { SelectOptions } from 'core/interface/select';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import FieldWrapper from './FieldWrapper';

type ISelect = SelectProps & {
  name: string;
  options: SelectOptions[];
  placeholder: string;
  title: string;
  rules?: Exclude<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >;
};

const SelectC: React.FunctionComponent<ISelect> = ({
  name,
  title,
  defaultValue = '',
  placeholder,
  options,
  rules,
  ...rest
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FieldWrapper title={title} name={name}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field }) => {
          return (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: errors ? '12px' : 0,
              }}
            >
              <Select
                {...field}
                {...rest}
                onChange={(e) => {
                  field.onChange(e);
                }}
                error={!!errors[name]}
                defaultValue={defaultValue}
                placeholder={placeholder}
                sx={{
                  '& .MuiSelect-select .notranslate::after': placeholder
                    ? {
                        content: `"${placeholder}"`,

                        opacity: 0.42,
                      }
                    : {},
                  width: 400,
                }}
                MenuProps={{
                  sx: {
                    height: 250,
                  },
                }}
              >
                {options.map((option) => {
                  return (
                    <MenuItem key={option.label} value={option.value}>
                      {option.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </Box>
          );
        }}
      />
    </FieldWrapper>
  );
};
export default SelectC;
