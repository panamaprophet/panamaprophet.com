import Player from '../../components/Player';
import { TrackState } from '../../types';


type Props = {
    tracks: TrackState[],
    onPlay: (id: number) => void,
};


const PlayerContainer = ({ tracks, onPlay }: Props) => {
    const trackProps = tracks.map((track, index) => ({
        ...track,
        onPlay,
        index,
    }));

    return <Player tracks={trackProps} />;
};


export default PlayerContainer;
