import { Box, Button } from '@mui/material';
import { buttonText } from 'core/constant/button';
import { getLoginCasdoorUrl } from 'util/url';

const AuthLogin = () => {
  const handleLogin = () => {
    window.location.href = getLoginCasdoorUrl();
  };
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        backgroundColor: 'primary.main',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '64px',
          backgroundColor: '#fff',
          padding: '60px 180px',
          borderRadius: '10px',
        }}
      >
        <Box
          component="img"
          alt="company-logo"
          src="/asset/img/TPP-logo.png"
          sx={{ maxWidth: 400, maxHeight: 116 }}
        />
        <Button
          variant="contained"
          sx={{
            fontWeight: 600,
            fontSize: '20px',
            height: 80,
            borderRadius: '10px',
            backgroundColor: 'secondary.main',
            ':hover': {
              backgroundColor: 'secondary.main',
              opacity: 0.8,
            },
          }}
          onClick={handleLogin}
        >
          {buttonText.LOGIN_TPP}
        </Button>
      </Box>
    </Box>
  );
};

export default AuthLogin;
