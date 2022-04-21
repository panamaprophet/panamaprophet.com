import { Text } from '../components/Text';
import { Video } from '../components/Video';
import { Image } from '../components/Image';
import { Links } from '../components/Links';
import { Player } from '../components/Player';
import { Column, Row } from '../components/Layout';

import { resolvePageDataById, resolveSocialLinks } from '../resolvers/pages';
import { resolveTracks } from '../resolvers/soundcloud';
import { getPlaylists, isInPlaylist, getTrackUrl } from '../helpers';

import { useAudio } from '../hooks/useAudio';

import * as Types from '../types';


interface Props {
    id: string,
    data: Types.Section[],
    links: { [key: string]: string },
    tracks: Types.Track[],
};


export default function Main({ data, tracks }: Props) {
    const [state, setTrackState] = useAudio(tracks, getTrackUrl);

    return (
        <>
            {data.map((props, index) => (
                <Column key={index}>
                    <Row direction={index % 2 ? 'reverse' : 'straight'}>
                        {props.image && <Image {...props.image} alt={props.title} />}
                        {props.video && <Video {...props.video} />}

                        <Text title={props.title}>
                            {props.description.map(line => <p key={line}>{line}</p>)}
                            {props.links && <Links urls={props.links} />}
                        </Text>
                    </Row>
                    <Row>
                        {props.playlist && (<Player
                            tracks={state.filter(isInPlaylist(props.playlist))}
                            onPlay={setTrackState}
                        />)}
                    </Row>
                </Column>
            ))}
        </>
    );
};


export const getServerSideProps = async () => {
    const data = resolvePageDataById('main');

    if (!data) {
        return { notFound: true };
    }

    return {
        props: {
            data,
            links: resolveSocialLinks(),
            tracks: await resolveTracks(getPlaylists(data)),
        },
        // revalidate: 86400,
    };
};
