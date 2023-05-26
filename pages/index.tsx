import { Title, Description } from '../components/Text';
import { Video } from '../components/Video';
import { Image } from '../components/Image';
import { Links } from '../components/Links';
import { Player } from '../components/Player';
import { Column, Row } from '../components/Layout';

import { resolvePageData } from '../services/page-data';
import { resolveTracks } from '../services/soundcloud';
import { getPlaylists, getTrackUrl } from '../helpers';

import { useAudio } from '../hooks/useAudio';

import * as Types from '../types';


interface Props {
    id: string,
    data: Types.Section[],
    links: { [key: string]: string },
    tracks: Types.Track[],
};


export default function Main(props: Props) {
    const [tracks, setTrackState, AudioProvider] = useAudio(props.tracks, getTrackUrl);

    return (
        <>
            <AudioProvider />
            {props.data.map((section, index) => (
                <Column key={index}>
                    <Row direction={index % 2 ? 'reverse' : 'straight'}>
                        {section.image && <Image {...section.image} alt={section.title} />}
                        {section.video && <Video {...section.video} />}
                        <Column style={{ justifyContent: 'center' }}>
                            <Title text={section.title} />
                            <Description text={section.description} />
                            <Links urls={section.links ?? {}} />
                        </Column>
                    </Row>
                    <Row>
                        {section.playlist && <Player
                            onPlay={setTrackState}
                            tracks={tracks.filter(({ playlist }) => playlist === section.playlist)}
                        />}
                    </Row>
                </Column>
            ))}
        </>
    );
};


export const getStaticProps = async () => {
    const data = await resolvePageData('main');
    const links = await resolvePageData('social');
    const tracks = await resolveTracks(getPlaylists(data));

    return {
        notFound: !data,
        props: { data, links, tracks },
    };
};
