import { Box, Typography, TypographyProps } from '@mui/material';
import { CustomFC } from 'core/interface/component';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
interface Props {
  title?: string;
  name?: string;
  labelStyle?: TypographyProps['sx'];
  errorStyle?: TypographyProps['sx'];
  dir?: 'row' | 'column';
}

const FieldWrapper: CustomFC<Props> = ({
  title,
  children,
  name,
  labelStyle,
  errorStyle,
  dir = 'row',
}) => {
  const {
    formState: { errors },
  } = useFormContext();

  const errorText = useMemo(() => {
    if (!name) return null;
    const error = errors[name]?.message;
    if (typeof error === 'string') return error;
    return null;
  }, [name, errors]);
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: dir,
      }}
    >
      <Typography sx={{ width: '200px', ...labelStyle }}>{title}</Typography>
      <Box>
        {children}
        {errorText && (
          <Typography
            sx={{ color: 'red', fontSize: 12, marginTop: '5px', ...errorStyle }}
          >
            {errorText}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default FieldWrapper;
