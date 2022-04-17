import Head from 'next/head';


interface Props {
    title: string,
    description: string,
    url?: string,
}


const getDefaultUrl = () => window.location.href;

const getTitle = (title: string, description: string) => title && description ? `${title} — ${description}` : (title || description);


const Meta = ({ title = '', description = '', url = getDefaultUrl() }: Props) => (
    <Head>
        <title>{getTitle(title, description)}</title>

        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />

        <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto+Condensed:700|Roboto:100,300,400&amp;subset=cyrillic" />
        <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="/favicon.ico" />
    </Head>
);

export default Meta;
