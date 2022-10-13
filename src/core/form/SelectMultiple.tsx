import { Box, Chip, Select, SelectProps } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { UI_DEFAULT_VALUE } from 'core/constant';
import { BaseInputProps } from 'core/interface/form/base';
import { SelectOptions } from 'core/interface/select';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import FieldWrapper from './FieldWrapper';

type ISelectMultiple = SelectProps &
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

const SelectMultipleC: React.FunctionComponent<ISelectMultiple> = ({
  name,
  title,
  defaultValue = [],
  options,
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
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field }) => {
          return (
            <Select
              {...field}
              {...rest}
              multiple={true}
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
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                );
              })}
            </Select>
          );
        }}
      />
    </FieldWrapper>
  );
};
export default SelectMultipleC;
