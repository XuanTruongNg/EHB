import { FunctionComponent } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface LoadingProps {}

const Loading: FunctionComponent<LoadingProps> = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
        opacity: 0.8,
      }}
    >
      <img
        style={{ width: '300px', height: '190px' }}
        src="/asset/icon/tpp_logo.svg"
        alt="tpp logo"
      />
      <CircularProgress />
    </Box>
  );
};

export default Loading;
