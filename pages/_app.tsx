import { AppProps } from 'next/app';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Links } from '../components/Links';
import { Logo } from '../components/Logo';
import { ScrollDownButton } from '../components/ScrollDownButton';

import '../styles/globals.css';


const Application = ({ Component, pageProps }: AppProps) => (
    <>
        <Header>
            <Logo />
            <ScrollDownButton target="main" />
        </Header>

        <main id="main">
            <Component {...pageProps} />
        </main>

        <Footer>
            <Links urls={pageProps.links ?? {}} size={32} />
        </Footer>
    </>
);


export default Application;
