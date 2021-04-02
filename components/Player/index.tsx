import styles from './Player.module.css';


type TrackProps = {
    id: number,
    index: number,
    url: string,
    title: string,
    duration: number,
    isPlaying: boolean,
    onPlay: (id: number) => void,
};

type PlayerProps = {
    tracks: TrackProps[],
};


const SPLIT_TITLE_REGEXP = /[·・]/;


const formatDuration = (duration: number) => {
    const minutes = duration / 1000 / 60 | 0;
    const seconds = duration / 1000 % 60 | 0;
    const secondsWithPadding = seconds.toString().padStart(2, '0');

    return `${minutes}:${secondsWithPadding}`;
};

const formatTitle = (title: string) => {
    const [result] = title.split(SPLIT_TITLE_REGEXP);

    return result;
};

const getTrackNumberByIndex = (index: number) => {
    return (index + 1).toString().padStart(2, '0');
};


const Track = ({id, index, url, title, duration, isPlaying, onPlay}: TrackProps) => (
    <div onClick={() => onPlay(id)} key={url} className={[
        styles.track,
        isPlaying && styles.isPlaying,
    ].join(' ')}>
        <span className={styles.number}>{isPlaying ? '▶' : getTrackNumberByIndex(index)}</span>
        <span className={styles.title}>{formatTitle(title)}</span>
        <span className={styles.duration}> {formatDuration(duration)}</span>
    </div>
);


const Player = ({tracks}: PlayerProps) => {
    if (!tracks || tracks.length === 0) {
        return null;
    }

    return (
        <div className={styles.root}>
            {tracks.map((item, index) => (<Track
                {...item}
                index={index}
                key={item.id}
            />))}
        </div>
    );
};


export default Player;
