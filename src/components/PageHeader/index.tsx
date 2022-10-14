import { FC } from 'react';
import { Box, Typography } from '@mui/material';

interface Props {
  title: string;
  height: number;
}

const PageHeader: FC<Props> = ({ title, height }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        px: '32px',
        height,
        borderBottom: '1px solid #C1C1C1',
      }}
    >
      <Typography sx={{ fontWeight: 600, fontSize: 20 }}>{title}</Typography>
    </Box>
  );
};

export default PageHeader;
