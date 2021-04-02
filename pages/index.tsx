import Header from '../components/Header';
import Meta from '../components/Meta';
import Footer from '../components/Footer';
import Section from '../components/Section';
import Player from '../containers/Player';
import useAudio from '../hooks/useAudio';
import {getPageDataById, getSocialLinks, getTracksData, getEnv} from '../resolvers';
import {getAlignByIndex, mapTracksToState, getTracksByPlaylist, getPlaylists} from '../helpers';
import {PAGE_IDS} from '../constants';

import type {AppContext} from 'next/app';
import type {Section as SectionType, Track} from '../types';

import styles from '../styles/Main.module.css';


type Props = {
    id: string,
    data: SectionType[],
    links: Record<string, string>,
    tracks: Track[],
};


export default function Main({
    id = PAGE_IDS.MAIN,
    data,
    links,
    tracks,
}: Props) {
    const [state, setTrackState] = useAudio(tracks);

    return (
        <div className={styles.root}>
            <Meta />
            <Header scrollTarget={id} />
            <main id={id}>
                {data && data.map((item, index) => (
                    <Section key={index} align={getAlignByIndex(index)} {...item}>
                        {item.playlist && (<Player
                            tracks={mapTracksToState(getTracksByPlaylist(tracks, item.playlist), state)}
                            onPlay={setTrackState}
                        />)}
                    </Section>
                ))}
            </main>
            <Footer links={links} />
        </div>
    );
};


export const getStaticProps = async (context: AppContext) => {
    const env = await getEnv();
    const data = await getPageDataById(PAGE_IDS.MAIN);

    if (!data) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            data,
            links: await getSocialLinks(),
            tracks: await getTracksData(getPlaylists(data), env.clientId),
        },
        revalidate: env.revalidationInterval,
    };
};
