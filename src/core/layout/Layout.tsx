import { Grid } from '@mui/material';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import { useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { ReactComponent as ChartIcon } from 'common/icon/chart-icon.svg';
import PendingActionsRoundedIcon from '@mui/icons-material/PendingActionsRounded';
import { NavigationItem } from 'core/interface/navigation';

const Layout = () => {
  const NavigationItem: NavigationItem[] = useMemo(
    () => [
      {
        acceptRoles: ['PM'],
        icon: <ChartIcon />,
        text: 'Dashboard',
        path: '/dashboard',
      },
      {
        acceptRoles: ['PM'],
        icon: <AddCircleOutlineOutlinedIcon />,
        text: 'Projects',
        path: '/project',
      },
      {
        acceptRoles: ['PM'],
        icon: <PersonAddOutlinedIcon />,
        text: 'Resources',
        path: '/resource',
      },
      {
        acceptRoles: ['PM'],
        icon: <PendingActionsRoundedIcon />,
        text: 'Timesheet',
        path: '/time-sheet',
      },
    ],
    []
  );
  return (
    <>
      <Header navigationItems={NavigationItem} />
      <Grid container sx={{ minHeight: '100vh', overflow: 'auto' }}>
        <Grid
          xs="auto"
          sx={{
            borderRight: '1px solid gray',
          }}
        >
          <Sidebar navigationItems={NavigationItem} />
        </Grid>
        <Grid
          xs
          sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default Layout;
