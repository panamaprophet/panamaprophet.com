import Section from '../components/Section';
import Header from '../components/Header';
import Meta from '../components/Meta';
import Footer from '../components/Footer';

import {
    getMainPageData,
    getSocialLinks,
 } from '../resolvers';

import styles from '../styles/Home.module.css';


export default function Home({ mainId = 'main', data = null, links = null }) {
    return (
        <div className={styles.root}>
            <Meta />
            <Header scrollTarget={mainId} />
            <main id={mainId}>
                {data && data.map((section, index) => (<Section
                    key={index}
                    align={index % 2 ? 'right' : 'left'}
                    {...section}
                />))}
            </main>
            <Footer links={links} />
        </div>
    )
};


export const getStaticProps = async context => {
    const data = await getMainPageData();
    const links = await getSocialLinks();

    return {
        props: {
            data,
            links,
        },
    };
};
