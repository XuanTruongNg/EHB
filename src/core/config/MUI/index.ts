import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#003676',
    },
    secondary: {
      main: '#35CA4D',
      light: '#BBB8B8',
    },
    common: {
      black: '#000',
      white: '#fff',
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiSelect: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        sizeMedium: {
          width: 170,
          height: 36,
          borderRadius: '5px',
          fontWeight: 600,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        bar: { backgroundColor: '#35CA4D' },
        colorPrimary: { backgroundColor: '#BAE1F1' },
      },
    },
  },
  typography: {
    fontFamily: ['Inter', 'sans-serif'].join(','),
    fontWeightBold: '500',
    button: {
      textTransform: 'none',
    },
  },
});

export default theme;
