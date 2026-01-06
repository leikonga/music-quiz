import type { AppProps } from "next/app";
import "../styles/globals.css";

import { AuthProvider } from "@components/auth/AuthContext";
import { PlayerProvider } from "@components/player/PlayerContext";
import { Layout } from "@components/Layout";
import Head from "next/head";
import { JetBrains_Mono } from "next/font/google";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <PlayerProvider>
        <Head>
          <title>Josholaus Music Quiz</title>
          <meta
            name="description"
            content="Josholaus Music Quiz back at it again lol"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
          <main className={jetBrainsMono.className}>
            <Component {...pageProps} />
          </main>
        </Layout>
      </PlayerProvider>
    </AuthProvider>
  );
}

export default MyApp;
