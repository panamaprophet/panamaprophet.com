import styles from './Player.module.css';


const SPLIT_TITLE_REGEXP = /[·・]/;


const formatDuration = duration => {
    const minutes = duration / 1000 / 60 | 0;
    const seconds = duration / 1000 % 60 | 0;
    const secondsWithPadding = seconds.toString().padStart(2, 0);

    return `${minutes}:${secondsWithPadding}`;
};

const formatTitle = title => {
    const [result] = title.split(SPLIT_TITLE_REGEXP);

    return result;
};

const getTrackNumberByIndex = index => (index + 1).toString().padStart(2, 0);


const Track = ({id, index, url, title, duration, onPlay}) => (
    <div onClick={onPlay(id)} key={url} className={styles.track}>
        <span className={styles.number}>{getTrackNumberByIndex(index)}</span>
        <span className={styles.title}>{formatTitle(title)}</span>
        <span className={styles.duration}> {formatDuration(duration)}</span>
    </div>
);

const Player = ({tracks, onPlay}) => {
    if (!tracks) {
        return null;
    }

    return (
        <div className={styles.root}>
            {tracks.map((item, index) => (<Track
                {...item}
                index={index}
                key={item.id}
                onPlay={onPlay}
            />))}
        </div>
    );
};


export default Player;
