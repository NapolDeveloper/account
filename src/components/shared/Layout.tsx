import { ReactNode } from 'react';
import Head from 'next/head';

import SEO from './SEO';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <SEO title="Account" description="내 자산 관리를 보다 쉽게 !" image="" />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {children}
    </div>
  );
}
