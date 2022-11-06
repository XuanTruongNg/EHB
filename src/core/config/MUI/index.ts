import { createTheme } from "@mui/material";

export const disableFromFieldVariant = {
  props: { disabled: true },
  style: {
    "& fieldset": {
      border: "none"
    },
    "& .Mui-disabled": {
      WebkitTextFillColor: "#000 !important"
    },
    "& .MuiSelect-icon": {
      opacity: 0
    }
  }
};

export const theme = createTheme({
  palette: {
    primary: {
      main: "#003676"
    },
    secondary: {
      main: "#35CA4D",
      light: "#BBB8B8"
    },
    common: {
      black: "#000",
      white: "#fff"
    }
  },
  components: {
    MuiTextField: {
      defaultProps: {
        size: "small"
      },
      variants: [disableFromFieldVariant]
    },
    MuiSelect: {
      defaultProps: {
        size: "small"
      },
      variants: [disableFromFieldVariant]
    },
    MuiButton: {
      defaultProps: {
        variant: "contained"
      },
      styleOverrides: {
        sizeMedium: {
          width: 170,
          height: 36,
          borderRadius: "5px",
          fontWeight: 600
        }
      }
    },
    MuiLinearProgress: {
      styleOverrides: {
        bar: { backgroundColor: "#35CA4D" },
        colorPrimary: { backgroundColor: "#BAE1F1" }
      }
    }
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    fontWeightBold: "500",
    button: {
      textTransform: "none"
    }
  }
});

export default theme;
