import { TextField, TextFieldProps } from "@mui/material";
import { FC } from "react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import { UI_DEFAULT_VALUE } from "core/constant";
import { BaseInputProps } from "core/interface/form/base";
import { FieldWrapper } from "./FieldWrapper";

type ITextField = TextFieldProps &
  BaseInputProps & {
    name?: string;
    title?: string;
    type?: string;
    disabled?: boolean;
    defaultValue?: string | number;
    rules?: Exclude<RegisterOptions, "valueAsNumber" | "valueAsDate" | "setValueAs">;
  };

export const TextFieldC: FC<ITextField> = ({
  name,
  title,
  defaultValue = "",
  rules,
  labelStyle,
  errorStyle,
  dir,
  onChange,
  sx,
  ...rest
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FieldWrapper dir={dir} name={name} title={title} labelStyle={labelStyle} errorStyle={errorStyle}>
      {name ? (
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          rules={rules}
          render={({ field }) => (
            <TextField
              {...field}
              sx={{
                width: UI_DEFAULT_VALUE.INPUT_WIDTH,
                "& fieldset": {
                  border: rest.disabled ? "none" : "1px solid rgba(0, 0, 0, 0.23)",
                },
                "& .Mui-disabled": {
                  WebkitTextFillColor: "black",
                },
                ...sx,
              }}
              error={!!errors[name]}
              onChange={(event) => {
                field.onChange(rest.type === "number" ? +event.target.value : event.target.value);

                if (onChange) onChange(event);
              }}
              InputProps={{
                inputProps: { min: 0 },
                ...rest.InputProps,
              }}
              {...rest}
            />
          )}
        />
      ) : (
        <TextField
          sx={{
            width: UI_DEFAULT_VALUE.INPUT_WIDTH,
            ...sx,
          }}
          InputProps={{
            inputProps: { min: 0 },
            ...rest.InputProps,
          }}
          {...rest}
        />
      )}
    </FieldWrapper>
  );
};
