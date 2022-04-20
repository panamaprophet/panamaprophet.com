import { TrackState } from '../../types';
import { getTrackNumberByIndex, formatTitle, formatDuration } from './helpers';
import styles from './index.module.css';


type TrackProps = TrackState & {
    index: number,
    onPlay: (id: number) => void,
};

type PlayerProps = {
    tracks: TrackState[],
    onPlay: (id: number) => void,
};


export const Track = ({ id, index, url, title, duration, isPlaying, onPlay }: TrackProps) => (
    <div onClick={() => onPlay(id)} key={url} className={[
        styles.track,
        isPlaying && styles.isPlaying,
    ].join(' ')}>
        <span className={styles.number}>{isPlaying ? '▶' : getTrackNumberByIndex(index)}</span>
        <span className={styles.title}>{formatTitle(title)}</span>
        <span className={styles.duration}> {formatDuration(duration)}</span>
    </div>
);


export const Player = ({ tracks, onPlay }: PlayerProps) => {
    if (!tracks || tracks.length === 0) {
        return null;
    }

    return (
        <div className={styles.root}>
            {tracks.map((item, index) => (<Track
                {...item}
                onPlay={onPlay}
                index={index}
                key={item.id}
            />))}
        </div>
    );
};
