import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import { SelectProps, Select, Chip } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/material';
import { Option } from 'core/interface/selectOption';
import FieldWrapper from './FieldWrapper';

type ISelectMultiple = SelectProps & {
  name: string;
  options: Option[];
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
  const { control } = useFormContext();

  return (
    <FieldWrapper title={title}>
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
              renderValue={(selected) => {
                const selectedItemValues: Option['value'][] = selected;
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
              sx={{
                '& .MuiSelect-select .notranslate::after': placeholder
                  ? {
                      content: `"${placeholder}"`,
                      opacity: 0.42,
                    }
                  : {},
                width: 400,
                ...rest.sx,
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
          );
        }}
      />
    </FieldWrapper>
  );
};
export default SelectMultipleC;
