import { Box, Typography } from '@mui/material';
import { CustomFC } from 'core/interface/component';

interface Props {
  title: string;
  width?: string;
}

const FieldWrapper: CustomFC<Props> = ({
  title,
  children,
  width = '200px',
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <Typography sx={{ width }}>{title}</Typography>
      {children}
    </Box>
  );
};

export default FieldWrapper;
