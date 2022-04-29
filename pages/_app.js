import { Client, Server } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider, styled, DarkTheme } from "baseui";

import "../styles/globals.css";

const getHydrateClass = () =>
  document.getElementsByClassName("_styletron_hydrate_");
export const styletron =
  typeof window === "undefined"
    ? new Server()
    : new Client({
        hydrate: getHydrateClass(),
      });

function MyApp({ Component, pageProps }) {
  return (
    <StyletronProvider value={styletron}>
      <BaseProvider theme={LightTheme}>
        <Component {...pageProps} />
      </BaseProvider>
    </StyletronProvider>
  );
}

export default MyApp;
