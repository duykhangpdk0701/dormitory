import "@/styles/globals.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "swiper/css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import createEmotionCache from "@/utils/createEmotionCache";
import { EmotionCache } from "@emotion/cache";
import CssBaseline from "@mui/material/CssBaseline";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { CacheProvider } from "@emotion/react";
import ThemeProviderWrapper from "@/theme/ThemeProvider";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import { QueryClient, QueryClientProvider } from "react-query";
import ActionSnackbar from "@/components/ActionSnackBar";
import { wrapper } from "@/contexts/store";
import { Backdrop, CircularProgress } from "@mui/material";
import { useAppSelector } from "@/hooks/redux";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

const clientSideEmotionCache = createEmotionCache();
function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const backdropState = useAppSelector((state) => state.backdrop.open);

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  const layout = getLayout(<Component {...pageProps} />);

  const queryClient = new QueryClient();

  return (
    <>
      <StyledEngineProvider injectFirst>
        <CacheProvider value={emotionCache}>
          <QueryClientProvider client={queryClient}>
            <ThemeProviderWrapper>
              <>
                <CssBaseline />
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  {layout}
                  <ActionSnackbar />
                  <Backdrop className="z-[1000]" open={backdropState}>
                    <CircularProgress color="inherit" />
                  </Backdrop>
                </LocalizationProvider>
              </>
            </ThemeProviderWrapper>
          </QueryClientProvider>
        </CacheProvider>
      </StyledEngineProvider>
    </>
  );
}

export default wrapper.withRedux(App);
