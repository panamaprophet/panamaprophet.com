import type { Track } from '@/entities/release';
import { usePlayback } from '../../model';

const Markers = {
    idle: '○',
    loading: '◌',
    playing: '▶',
    paused: 'Ⅱ',
    error: '✕',
};

export const TrackList = ({ tracks }: { tracks: Track[] }) => {
    const { track: activeTrack, status, play, pause } = usePlayback();

    if (tracks.length === 0) {
        return null;
    }

    return (
        <ol className="w-full">
            {tracks.map((track, index) => {
                const isActive = track === activeTrack;

                return (
                    <li key={track.url}>
                        <button
                            type="button"
                            className="group mb-5 flex w-full cursor-pointer border-b border-[rgb(66_66_66/0.2)] text-left leading-[1.8] text-[#666] transition-colors duration-250 hover:border-accent focus-visible:border-accent focus-visible:outline-none aria-[current=true]:border-accent"
                            aria-current={isActive || undefined}
                            onClick={() => isActive && status === 'playing' ? pause() : play(track)}
                        >
                            <span className="mr-2 inline-block w-5 opacity-20 transition-opacity duration-250 group-hover:text-accent group-hover:opacity-100 group-focus-visible:text-accent group-focus-visible:opacity-100 group-aria-[current=true]:text-accent group-aria-[current=true]:opacity-100">{isActive ? Markers[status] : String(index + 1).padStart(2, '0')}</span>
                            <span className="flex-1 truncate">{track.title}</span>
                            <span>{track.duration}</span>
                        </button>
                    </li>
                );
            })}
        </ol>
    );
};
