import { getTrackNumberByIndex } from '../../lib';
import type { Track } from '../../model';
import './index.css';

interface Props {
    tracks: Track[],
    onSelect: (track: Track) => void,
    activeUrl?: string | null,
    activeMarker?: string,
}

export const TrackList = ({ tracks, onSelect, activeUrl = null, activeMarker = '▶' }: Props) => {
    if (tracks.length === 0) {
        return null;
    }

    return (
        <ol className="track-list">
            {tracks.map((track, index) => {
                const isActive = track.url === activeUrl;

                return (
                    <li key={track.url}>
                        <button
                            type="button"
                            className={isActive ? 'track-list__track track-list__track_active' : 'track-list__track'}
                            aria-current={isActive || undefined}
                            onClick={() => onSelect(track)}
                        >
                            <span className="track-list__number">{isActive ? activeMarker : getTrackNumberByIndex(index)}</span>
                            <span className="track-list__title">{track.title}</span>
                            <span>{track.duration}</span>
                        </button>
                    </li>
                );
            })}
        </ol>
    );
};
