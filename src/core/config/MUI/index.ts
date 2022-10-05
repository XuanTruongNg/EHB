import { createTheme } from '@mui/material';

export const theme = createTheme({
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
