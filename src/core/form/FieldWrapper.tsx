import { Box, Typography } from '@mui/material';
import { CustomFC } from 'core/interface/component';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
interface Props {
  title: string;
  width?: string;
  margin?: string;
  name: string;
}

const FieldWrapper: CustomFC<Props> = ({
  title,
  children,
  name,
  margin,
  width = '200px',
}) => {
  const {
    formState: { errors },
  } = useFormContext();

  const errorText = useMemo(() => {
    const error = errors[name]?.message;
    if (typeof error === 'string') return error;
    return '';
  }, [name, errors]);
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <Typography sx={{ width, margin }}>{title}</Typography>
      <Box>
        {children}
        {errorText && (
          <Typography sx={{ color: 'red', fontSize: 12, marginTop: '5px' }}>
            {errorText}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default FieldWrapper;
