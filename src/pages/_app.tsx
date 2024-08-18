"use client";
import { AppProps } from "next/app";
import RootLayout from "../app/layout";
import { Providers } from "../providers"; // Import the Providers component

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      {" "}
      {/* Wrap the application with Providers */}
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </Providers>
  );
}

export default MyApp;
