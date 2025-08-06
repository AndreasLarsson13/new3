import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import { ManagedUIContext } from "@contexts/ui.context";
import ManagedModal from "@components/common/modal/managed-modal";
import ManagedDrawer from "@components/common/drawer/managed-drawer";
import { useEffect, useRef, useState } from "react";
import { QueryClient, QueryClientProvider, HydrationBoundary } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
// import { ReactQueryDevtools } from "@tanstack/react-query/devtools";
import { appWithTranslation } from "next-i18next";
import { DefaultSeo } from "@components/common/default-seo";
import InitializeLocation from "./locationIntilize"

// Load Open Sans and satisfy typeface font
import "@fontsource/open-sans";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/satisfy";
// external
import "react-toastify/dist/ReactToastify.css";
// base css file
import "@styles/scrollbar.css";
import "@styles/swiper-carousel.css";
import "@styles/custom-plugins.css";
import "@styles/tailwind.css";
import "@styles/rc-drawer.css";
import { getDirection } from "@utils/get-direction";
import UnderConstruction from "../pages/underConstruction";

import '../styles/fonts.css';




function handleExitComplete() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0 });
  }
}

function Noop({ children }: React.PropsWithChildren<{}>) {
  return <>{children}</>;
}



const CustomApp = ({ Component, pageProps }: AppProps) => {
  const [showSite, setShowSite] = useState(false);
  const router = useRouter();
  const dir = getDirection(router.locale);
  const queryClientRef = useRef<any>();

  // Setup text direction
  useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);

  // Check preview mode
  useEffect(() => {
    const isAllowed = typeof window !== "undefined" && localStorage.getItem("previewMode") === "true";
    setShowSite(isAllowed);
  }, []);

  // Setup query client
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  const Layout = (Component as any).Layout || Noop;

  const isUnderConstruction = true; // Toggle this to false when ready

  // ⛔ This comes AFTER all hooks
  if (isUnderConstruction && !showSite) {
    return <UnderConstruction />;
  }

  return (

    <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
      {/*  <InitializeLocation /> */}

      <QueryClientProvider client={queryClientRef.current}>
        {/* @ts-ignore */}
        <HydrationBoundary state={pageProps.dehydratedState}>
          {/* @ts-ignore */}
          <ManagedUIContext>

            <Layout pageProps={pageProps}>
              <DefaultSeo />
              <Component {...pageProps} key={router.route} />
              <ToastContainer />
            </Layout>
            <ManagedModal />
            <ManagedDrawer />
          </ManagedUIContext>
        </HydrationBoundary>
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </AnimatePresence>
  );
};

export default appWithTranslation(CustomApp);
