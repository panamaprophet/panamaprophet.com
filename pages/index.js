import Section from '../components/Section';
import Header from '../components/Header';
import Meta from '../components/Meta';
import Footer from '../components/Footer';
import Player from '../components/Player';
import useAudio from '../hooks/useAudio';
import {getPageDataById, getSocialLinks, getTracksData} from '../resolvers';
import {PAGE_IDS} from '../constants';

import styles from '../styles/Main.module.css';


const getAlignByIndex = index => index % 2 ? 'right' : 'left';

const getPlaylists = data => data.map(item => item.playlist).filter(Boolean);

const getTracksByPlaylist = (tracks, playlist) => tracks.filter(track => track.playlist === playlist);

const mapTracksToState = (tracks, state) => tracks.map(track => state.find(item => item.id === track.id));



export default function Main({
    id = PAGE_IDS.MAIN,
    data,
    links,
    tracks,
}) {
    const [state, setTrackState] = useAudio(tracks);

    return (
        <div className={styles.root}>
            <Meta />
            <Header scrollTarget={id} />
            <main id={id}>
                {data && data.map((item, index) => (
                    <Section key={index} align={getAlignByIndex(index)} {...item}>
                        <Player
                            tracks={mapTracksToState(getTracksByPlaylist(tracks, item.playlist), state)}
                            onPlay={setTrackState}
                        />
                    </Section>
                ))}
            </main>
            <Footer links={links} />
        </div>
    );
};


export const getStaticProps = async context => {
    const data = await getPageDataById(PAGE_IDS.MAIN);
    const links = await getSocialLinks();
    const tracks = await getTracksData(getPlaylists(data), process.env.clientId);

    return {
        props: {
            data,
            links,
            tracks,
        },
        revalidate: Number(process.env.revalidationInterval),
    };
};
