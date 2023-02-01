import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import theme from "../src/theme";
import { AuthProvider } from "../src/hooks/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}
