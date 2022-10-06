import { Box } from '@mui/material';
import { FC } from 'react';
import { NavigationItem } from 'core/interface/navigation';
import { useNavigate, useLocation } from 'react-router-dom';

interface Props {
  navigationItems: NavigationItem[];
}

const Sidebar: FC<Props> = ({ navigationItems }) => {
  const navigate = useNavigate();
  const router = useLocation();
  return (
    <>
      {navigationItems.map((item, index) => {
        const isSelected = router.pathname === item.path;
        return (
          <Box
            key={index}
            sx={{
              width: 80,
              height: 80,
              fontSize: 36,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              backgroundColor: isSelected
                ? 'rgba(184, 205, 247, 0.35)'
                : 'common.white',
              ':hover': {
                backgroundColor: 'rgba(184, 205, 247, 0.55)',
              },
            }}
            onClick={() => navigate(item.path, { replace: true })}
          >
            {item.icon}
          </Box>
        );
      })}
    </>
  );
};

export default Sidebar;
