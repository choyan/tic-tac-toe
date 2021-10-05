import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import { store } from "store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;
