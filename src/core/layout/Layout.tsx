import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import PendingActionsRoundedIcon from '@mui/icons-material/PendingActionsRounded';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import { Grid } from '@mui/material';
import { ReactComponent as ChartIcon } from 'common/icon/chart-icon.svg';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import {
  ROLE_ADMIN,
  ROLE_EMPLOYEE,
  ROLE_PROJECT_MANAGER,
} from 'core/constant/role';
import { NavigationItem } from 'core/interface/navigation';
import { useMemo } from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const NavigationItem: NavigationItem[] = useMemo(
    () => [
      {
        acceptRoles: [ROLE_PROJECT_MANAGER, ROLE_ADMIN],
        icon: <ChartIcon />,
        text: 'Dashboard',
        path: '/dashboard',
      },
      {
        acceptRoles: [ROLE_PROJECT_MANAGER, ROLE_ADMIN],
        icon: <AddCircleOutlineOutlinedIcon />,
        text: 'Projects',
        path: '/project',
      },
      {
        acceptRoles: [ROLE_PROJECT_MANAGER, ROLE_ADMIN],
        icon: <PersonAddOutlinedIcon />,
        text: 'Resources',
        path: '/resource',
      },
      {
        acceptRoles: [ROLE_ADMIN, ROLE_EMPLOYEE],
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
