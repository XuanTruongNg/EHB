import { Box, Chip, Select, SelectProps } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { SelectOptions } from 'core/interface/select';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import FieldWrapper from './FieldWrapper';

type ISelectMultiple = SelectProps & {
  name: string;
  options: SelectOptions[];
  placeholder: string;
  title: string;
  rules?: Exclude<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >;
};

const SelectMultipleC: React.FunctionComponent<ISelectMultiple> = ({
  name,
  title,
  defaultValue = [],
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
                error={!!errors[name]}
                renderValue={(selected) => {
                  const selectedItemValues: SelectOptions['value'][] = selected;
                  return (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selectedItemValues?.map((value) => {
                        const label =
                          options.find((option) => option.value === value)
                            ?.label || '';
                        return <Chip key={value} label={label} />;
                      })}
                    </Box>
                  );
                }}
                multiple={true}
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
                    <MenuItem key={option.value} value={option.value}>
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
export default SelectMultipleC;
