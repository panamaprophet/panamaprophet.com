import { Html, Head, Main, NextScript } from 'next/document'


export default function Document() {
    const title = "Prophet P";
    const description = "the most authentic russkiy roots";
    const url = globalThis.location?.href;

    return (
        <Html>
            <Head>
                <meta charSet="utf-8" />

                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={url} />

                <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto+Condensed:700|Roboto:100,300,400&amp;subset=cyrillic" />
                <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="/favicon.ico" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
