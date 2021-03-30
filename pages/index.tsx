import Section from '../components/Section';
import Header from '../components/Header';
import Meta from '../components/Meta';
import Footer from '../components/Footer';
import Player from '../components/Player';
import useAudio from '../hooks/useAudio';
import {getPageDataById, getSocialLinks, getTracksData} from '../resolvers';
import {PAGE_IDS} from '../constants';

import type {AppContext} from 'next/app';
import type {SectionAlign, SectionEntity, Track, TrackState} from '../types';

import styles from '../styles/Main.module.css';


type Props = {
    id: string,
    data: SectionEntity[],
    links: Record<string, string>,
    tracks: Track[],
};


const getAlignByIndex = (index: number): SectionAlign => index % 2 ? 'right' : 'left';

const getPlaylists = (data: SectionEntity[]): string[] => data
    .map(item => item.playlist)
    .filter((item): item is string => Boolean(item));

const getTracksByPlaylist = (tracks: Track[], playlist: string): Track[] => tracks
    .filter(track => track.playlist === playlist);

const mapTracksToState = (tracks: Track[], state: TrackState[]): TrackState[] => tracks
    .map(track => state.find(item => item.id === track.id))
    .filter((item): item is TrackState => Boolean(item));



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
                {data && data.map((item: SectionEntity, index: number) => (
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
    const data = await getPageDataById(PAGE_IDS.MAIN);

    if (!data) {
        return {
            notFound: true,
        };
    }

    const links = await getSocialLinks();
    const tracks = await getTracksData(getPlaylists(data), process.env.clientId || '');

    return {
        props: {
            data,
            links,
            tracks,
        },
        revalidate: Number(process.env.revalidationInterval),
    };
};
