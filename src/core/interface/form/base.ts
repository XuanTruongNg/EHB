import { TypographyProps } from '@mui/material';

export type Direction = 'row' | 'column';

export interface BaseInputProps {
  labelStyle?: TypographyProps['sx'];
  errorStyle?: TypographyProps['sx'];
  dir?: Direction;
}
