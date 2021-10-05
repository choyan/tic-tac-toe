import Head from "next/head";
import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import Loader from "components/Loader";
import { store } from "store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

function MyApp({ Component, pageProps }: AppProps) {
  const persistor = persistStore(store);
  return (
    <>
      <Head>
        <title>Tic Tac Toe</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}
export default MyApp;
