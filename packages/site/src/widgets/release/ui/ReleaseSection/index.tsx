import { PlaylistTracks } from '@/features/playback';
import { ReleaseInfo, ReleaseMedia, type Release } from '@/entities/release';
import { Column, Row } from '@/shared/ui/Layout';

interface Props {
    release: Release,
    reverse?: boolean,
}

export const ReleaseSection = ({ release, reverse = false }: Props) => (
    <Column>
        <Row direction={reverse ? 'reverse' : 'straight'}>
            <ReleaseMedia release={release} />
            <ReleaseInfo release={release} />
        </Row>
        <Row>
            {release.tracks && <PlaylistTracks tracks={release.tracks} />}
        </Row>
    </Column>
);
