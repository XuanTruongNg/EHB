import { TextField, TextFieldProps } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Moment } from "moment";
import { FC } from "react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import { BaseInputProps } from "core/interface/form/base";
import { FieldWrapper } from "./FieldWrapper";

type IDatePicker = Omit<DatePickerProps<unknown, Moment>, "value" | "renderInput"> &
  BaseInputProps & {
    name: string;
    inputWidth?: string;
    title?: string;
    rules?: Exclude<RegisterOptions, "valueAsNumber" | "valueAsDate" | "setValueAs">;
    defaultValue?: string | number;
    inputStyle?: TextFieldProps["sx"];
  };

export const DatePickerC: FC<IDatePicker> = ({
  name,
  title,
  defaultValue = "",
  rules,
  inputStyle,
  labelStyle,
  errorStyle,
  dir,
  onChange,
  ...rest
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FieldWrapper name={name} title={title} errorStyle={errorStyle} labelStyle={labelStyle} dir={dir}>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          rules={rules}
          render={({ field }) => (
            <DatePicker
              {...field}
              onChange={(value) => {
                field.onChange(value);
                if (onChange) onChange(value);
              }}
              renderInput={(params) => (
                <TextField {...params} error={!!errors[name]} sx={{ width: "150px", ...inputStyle }} />
              )}
              {...rest}
            />
          )}
        />
      </FieldWrapper>
    </LocalizationProvider>
  );
};
