import type { Track } from '@/entities/release';
import { playback, usePlayback, type PlaybackStatus } from '../../model';
import './index.css';

const Markers: Record<PlaybackStatus, string> = {
    idle: '○',
    loading: '◌',
    playing: '▶',
    paused: 'Ⅱ',
    error: '✕',
};

export const TrackList = ({ tracks }: { tracks: Track[] }) => {
    const { track: activeTrack, status } = usePlayback();

    if (tracks.length === 0) {
        return null;
    }

    return (
        <ol className="track-list">
            {tracks.map((track, index) => {
                const isActive = track.url === activeTrack?.url;

                return (
                    <li key={track.url}>
                        <button
                            type="button"
                            className={isActive ? 'track-list__track track-list__track_active' : 'track-list__track'}
                            aria-current={isActive || undefined}
                            onClick={() => playback.toggle(track)}
                        >
                            <span className="track-list__number">{isActive ? Markers[status] : String(index + 1).padStart(2, '0')}</span>
                            <span className="track-list__title">{track.title}</span>
                            <span>{track.duration}</span>
                        </button>
                    </li>
                );
            })}
        </ol>
    );
};
