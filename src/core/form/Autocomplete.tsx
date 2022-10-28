import { Autocomplete, TextField, AutocompleteProps } from "@mui/material";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { UI_DEFAULT_VALUE } from "core/constant";
import { BaseInputProps } from "core/interface/form/base";
import { SelectOption } from "core/interface/select";
import { FieldWrapper } from "./FieldWrapper";

//TODO: fix Autocomplete to be able to use with single option. (only work with multiple right now)
//TODO change any to specific type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IAutocomplete = Omit<AutocompleteProps<any, any, any, any>, "renderInput"> &
  BaseInputProps & {
    name: string;
    options: SelectOption[];
    placeholder: string;
    title: string;
  };

export const AutocompleteC: FC<IAutocomplete> = ({
  name,
  title,
  multiple,
  defaultValue = multiple ? [] : "",
  placeholder,
  labelStyle,
  errorStyle,
  dir,
  onChange,
  ...rest
}) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <FieldWrapper dir={dir} name={name} title={title} labelStyle={labelStyle} errorStyle={errorStyle}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { value, ...fieldRest } }) => {
          let _value;
          if (!multiple) {
            _value = rest.options.find((option: SelectOption) => option.value === value);
          } else {
            _value = rest.options.filter((option) => !!value?.includes(option.value));
          }
          return (
            <Autocomplete
              {...fieldRest}
              value={_value}
              multiple={multiple}
              sx={{ width: UI_DEFAULT_VALUE.INPUT_WIDTH, ...rest.sx }}
              defaultValue={defaultValue}
              getOptionLabel={(option) => option.label}
              onChange={(event, data, reason, detail) => {
                if (multiple) {
                  const multiple = data.map((item: SelectOption) => item.value);
                  setValue(name, multiple);
                } else {
                  setValue(name, data.value);
                }

                if (onChange) onChange(event, data, reason, detail);
              }}
              renderOption={(props, option) => (
                <li {...props} key={option.value}>
                  {option.label}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!errors[name]}
                  variant="outlined"
                  placeholder={placeholder}
                  fullWidth
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "disabled",
                  }}
                />
              )}
              {...rest}
            />
          );
        }}
      />
    </FieldWrapper>
  );
};
