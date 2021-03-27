import Section from '../components/Section';
import Header from '../components/Header';
import Meta from '../components/Meta';
import Footer from '../components/Footer';
import Player from '../components/Player';
import useAudio from '../hooks/useAudio';
import {getMainPageData, getSocialLinks, getTracksData} from '../resolvers';
import {createInitialState} from '../helpers';

import styles from '../styles/Home.module.css';


export default function Home({
    id = 'main',
    data = null,
    links = null,
    tracks = null,
}) {
    const [state, setTrackState] = useAudio(createInitialState(tracks));

    const players = data.map(item => {
        const trackList = tracks[item.playerUrl];

        if (!trackList) {
            return null;
        }

        return (<Player
            tracks={trackList.map(track => state.find(item => item.id === track.id))}
            onPlay={setTrackState}
        />);
    });

    const sections = data && data.map((item, index) => (<Section
        key={index}
        align={index % 2 ? 'right' : 'left'}
        player={players[index]}
        onPlay={setTrackState}
        {...item}
    />));

    return (
        <div className={styles.root}>
            <Meta />
            <Header scrollTarget={id} />
            <main id={id}>{sections}</main>
            <Footer links={links} />
        </div>
    );
};

export const getStaticProps = async context => {
    const data = await getMainPageData();
    const links = await getSocialLinks();
    const trackUrls = data.map(({playerUrl}) => playerUrl).filter(Boolean);
    const tracks = await getTracksData(trackUrls, process.env.clientId);

    return {
        props: {
            data,
            links,
            tracks,
        },
        revalidate: Number(process.env.revalidationInterval),
    };
};
