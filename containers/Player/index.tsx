import Player from '../../components/Player';
import {Track} from '../../types';


type Props = {
    tracks: Track[],
    onPlay: (id: number) => void,
};


const PlayerContainer = ({tracks, onPlay}: Props) => {
    const trackProps = tracks.map((track, index) => ({
        ...track,
        onPlay,
        index,
    }));

    return <Player tracks={trackProps} />;
};


export default PlayerContainer;
