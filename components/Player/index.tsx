import { Track } from '../../types';
import { getTrackNumberByIndex, formatTitle, formatDuration } from './helpers';
import styles from './index.module.css';


interface Props {
    tracks: (Track & { isPlaying: boolean })[],
    onPlay: (id: number) => void,
}


export const Player = ({ tracks, onPlay }: Props) => {
    if (!tracks || tracks.length === 0) {
        return null;
    }

    return (
        <div className={styles.root}>
            {tracks.map((item, index) => (
                <div
                    key={item.url}
                    onClick={() => onPlay(item.id)}
                    className={[styles.track, item.isPlaying && styles.isPlaying].join(' ')}
                >
                    <span className={styles.number}>{item.isPlaying ? '▶' : getTrackNumberByIndex(index)}</span>
                    <span className={styles.title}>{formatTitle(item.title)}</span>
                    <span className={styles.duration}> {formatDuration(item.duration)}</span>
                </div>
            ))}
        </div>
    );
};
