import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#673AB7", // 강조색
    },
    background: {
      default: "#FFFFFF",
      paper: "#F5F5F5",
    },
    text: {
      primary: "#000000",
      secondary: "#555555",
    },
  },
  typography: {
    fontFamily: "Pretendard, sans-serif",
    h5: {
      fontWeight: "bold",
    },
    body1: {
      fontSize: "16px",
    },
    body2: {
      fontSize: "14px",
      color: "#757575",
    },
  },
  breakpoints: {
    values: {
      xs: 0, // Mobile
      sm: 400, // Small screens
      md: 900, // Medium screens
      lg: 1200, // Large screens
      xl: 1536, // Extra large screens
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#BB86FC", // 강조색
    },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#BDBDBD",
    },
  },
  typography: {
    fontFamily: "Pretendard, sans-serif",
    h5: {
      fontWeight: "bold",
    },
    body1: {
      fontSize: "16px",
    },
    body2: {
      fontSize: "14px",
      color: "#BDBDBD",
    },
  },
  breakpoints: {
    values: {
      xs: 0, // Mobile
      sm: 400, // Small screens
      md: 900, // Medium screens
      lg: 1200, // Large screens
      xl: 1536, // Extra large screens
    },
  },
});
