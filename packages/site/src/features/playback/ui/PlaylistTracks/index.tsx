import { TrackList, type Track } from '@/entities/track';
import { playback, usePlayback, type PlaybackStatus } from '../../model';

const Markers: Record<PlaybackStatus, string> = {
  idle: '○',
  loading: '◌',
  playing: '▶',
  paused: 'Ⅱ',
  error: '✕',
};

export const PlaylistTracks = ({ tracks }: { tracks: Track[] }) => {
    const { track, status } = usePlayback();

    return (
        <TrackList
            tracks={tracks}
            activeUrl={track?.url}
            activeMarker={Markers[status]}
            onSelect={playback.toggle}
        />
    );
};
