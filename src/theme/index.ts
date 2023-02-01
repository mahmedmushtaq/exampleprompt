import { createTheme } from "@mui/material";

import {
  Palette as MuiPallete,
  PaletteOptions as MuiPaletteOptions,
} from "@mui/material/styles/createPalette";

const font = "'Lexend', sans-serif";

const mediaQueryTheme = createTheme();

const theme = createTheme({
  palette: {
    primary: {
      main: "#212121cc",
    },
    secondary: {
      main: "#fa7930ff",
      contrastText: "white",
    },
    background: {
      default: "#f7f4f2ff",
    },
    colors: {
      darkblue: "#364570ff",
      lightgreen: "#9cbec6ff",
    },
  },
  typography: {
    fontFamily: font,
    h3: {
      [mediaQueryTheme.breakpoints.down("sm")]: {
        fontSize: "2rem",
      },
    },
    h4: {
      [mediaQueryTheme.breakpoints.down("sm")]: {
        fontSize: "1.75rem",
      },
    },
  },
});

declare module "@mui/material/styles" {
  interface Theme {}
  // allow configuration using `createTheme`
  interface ThemeOptions {}
}

declare module "@mui/material/styles/createPalette" {
  interface Palette extends MuiPallete {
    colors: { darkblue: string; lightgreen: string };
  }

  //@ts-ignore
  interface PaletteOptions extends MuiPaletteOptions {
    colors: { darkblue: string; lightgreen: string };
  }
}

export default theme;
