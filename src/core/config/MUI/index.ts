import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#003676',
    },
    secondary: {
      main: '#35CA4D',
    },
    common: {
      black: '#000',
      white: '#fff',
    },
  },
  components: {},
  typography: {
    fontFamily: ['Inter', 'sans-serif'].join(','),
    fontWeightBold: '500',
    button: {
      textTransform: 'none',
    },
  },
});

export default theme;
