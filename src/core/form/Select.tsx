import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import { SelectProps, Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { Option } from 'core/interface/selectOption';
import FieldWrapper from './FieldWrapper';

type ISelect = SelectProps & {
  name: string;
  options: Option[];
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
export default SelectC;
