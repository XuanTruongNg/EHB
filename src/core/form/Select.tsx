import { Box, Select, SelectProps } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { UI_DEFAULT_VALUE } from 'core/constant';
import { BaseInputProps } from 'core/interface/form/base';
import { SelectOptions } from 'core/interface/select';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import FieldWrapper from './FieldWrapper';

type ISelect = SelectProps &
  BaseInputProps & {
    name: string;
    options: SelectOptions[];
    placeholder?: string;
    title?: string;
    rules?: Exclude<
      RegisterOptions,
      'valueAsNumber' | 'valueAsDate' | 'setValueAs'
    >;
  };

const SelectC: React.FunctionComponent<ISelect> = ({
  name,
  title,
  defaultValue = '',
  options,
  rules,
  errorStyle,
  labelStyle,
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
      errorStyle={errorStyle}
      labelStyle={labelStyle}
    >
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
                sx={{
                  '& .MuiSelect-select .notranslate::after': rest.placeholder
                    ? {
                        content: `"${rest.placeholder}"`,

                        opacity: 0.42,
                      }
                    : {},
                  width: UI_DEFAULT_VALUE.INPUT_WIDTH,
                  ...rest.sx,
                }}
                MenuProps={{
                  sx: {
                    height: 250,
                  },
                  ...rest.MenuProps,
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
