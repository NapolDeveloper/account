import type { AppProps } from 'next/app';
import { Global } from '@emotion/react';
import {
  QueryClientProvider,
  QueryClient,
  HydrationBoundary,
} from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';

import globalStyles from '@/styles/globalStyles';

import Layout from '@/components/shared/Layout';

const client = new QueryClient();

export default function App({
  Component,
  pageProps: { dehydrateState, session, ...pageProps },
}: AppProps) {
  return (
    <Layout>
      <Global styles={globalStyles} />
      <SessionProvider session={session}>
        <QueryClientProvider client={client}>
          <HydrationBoundary state={dehydrateState}>
            <Component {...pageProps} />
          </HydrationBoundary>
        </QueryClientProvider>
      </SessionProvider>
    </Layout>
  );
}
