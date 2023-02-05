import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import theme from "../src/theme";
import { AuthProvider } from "../src/hooks/AuthContext";
import NextProgress from "next-progress";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <NextProgress delay={300} options={{ showSpinner: false }} />
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}
