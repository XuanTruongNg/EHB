import { Box, Typography } from '@mui/material';
import { NavigationItem } from 'core/interface/navigation';
import { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface Props {
  navigationItems: NavigationItem[];
}

const Header: FC<Props> = ({ navigationItems }) => {
  const navigate = useNavigate();
  const router = useLocation();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: '32px',
        height: 72,
        backgroundColor: 'primary.main',
      }}
    >
      <Box sx={{ display: 'flex', columnGap: '64px' }}>
        {navigationItems.map((item, index) => {
          const isSelected = router.pathname === item.path;
          return (
            <Typography
              key={index}
              sx={{
                color: isSelected ? 'pink' : 'common.white',
                fontSize: 20,
                fontWeight: 600,
                cursor: 'pointer',
              }}
              onClick={() => {
                navigate(item.path, { replace: true });
              }}
            >
              {item.text}
            </Typography>
          );
        })}
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 35,
          height: 35,
          borderRadius: '50%',
          backgroundColor: 'pink',
          fontWeight: 600,
          fontSize: 28,
        }}
      >
        <Typography>N</Typography>
      </Box>
    </Box>
  );
};

export default Header;
