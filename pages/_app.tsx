import { MantineProvider } from "@mantine/core";
import { AppProps } from "next/app";
import Head from "next/head";

import "@fontsource/nunito-sans/200.css";
import "@fontsource/nunito-sans/300.css";
import "@fontsource/nunito-sans/400.css";
import "@fontsource/nunito-sans/600.css";
import "@fontsource/nunito-sans/700.css";
import "@fontsource/nunito-sans/800.css";
import "@fontsource/nunito-sans/900.css";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
          fontFamily: "Nunito Sans",
          primaryShade: 7,
          headings: {
            fontFamily: "Nunito Sans",
          },
          defaultRadius: "md",
          primaryColor: "cyan",
          focusRingStyles: {
            resetStyles: () => ({ outline: "none" }),

            styles: (theme) => ({
              outline: `2px solid ${theme.colors[theme.primaryColor][5]}`,
            }),

            inputStyles: (theme) => ({
              outline: `2px solid ${theme.colors[theme.primaryColor][5]}`,
            }),
          },
          components: {
            Button: {
              defaultProps: {
                radius: "md",
              },
              styles: {},
            },
            Container: {
              defaultProps: {
                size: "xl",
              },
            },
          },
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
