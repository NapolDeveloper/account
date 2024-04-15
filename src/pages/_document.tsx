import { Html, Head, Main, NextScript } from 'next/document';

// 서버 사이드에서만 렌더링되는 코드
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <div id="root-portal" />
      </body>
    </Html>
  );
}
