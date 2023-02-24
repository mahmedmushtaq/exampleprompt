import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import theme from "../src/theme";
import { AuthProvider } from "../src/hooks/AuthContext";
import NextProgress from "next-progress";
import { pageView } from "../src/libs/ga";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    pageView(window.location.pathname);
  }, [router.asPath]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <NextProgress delay={300} options={{ showSpinner: false }} />
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}
