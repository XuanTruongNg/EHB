import { Slider, SliderProps } from '@mui/material';
import { BaseInputProps } from 'core/interface/form/base';
import { Controller, useFormContext } from 'react-hook-form';
import { FieldWrapper } from './FieldWrapper';

type ISelect = SliderProps &
  BaseInputProps & {
    name: string;
    title?: string;
  };

export const SliderC: React.FunctionComponent<ISelect> = ({
  name,
  title,
  defaultValue = [0, 10],
  errorStyle,
  labelStyle,
  dir,
  onChange,
  ...rest
}) => {
  const { control } = useFormContext();

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
        render={({ field }) => (
          <Slider
            {...field}
            sx={{ width: 400, ...rest.sx }}
            onChange={(event, value, activeThumb) => {
              field.onChange(value);
              if (onChange) onChange(event, value, activeThumb);
            }}
            valueLabelDisplay="auto"
            max={10}
            step={1}
            disableSwap
            {...rest}
          />
        )}
      />
    </FieldWrapper>
  );
};
