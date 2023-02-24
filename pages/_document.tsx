import { Html, Head, Main, NextScript } from "next/document";
import config from "../src/globals/config";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {config.env === "prod" && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${config.googleAnalyticId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${config.googleAnalyticId}', {
              page_path: window.location.pathname,
            });
          `,
              }}
            />
          </>
        )}

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@100;200;300;400;500;600;700;800;900&display=swap"
          data-tag="font"
        />
        <link rel="shortcut icon" href="/icon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
