import {useEffect, useState} from 'react';


const mapTracksToAudio = tracks => tracks.map(track => {
    const audioTrack = new Audio();

    audioTrack.preload = 'none';
    audioTrack.src =  track.url;

    return {
        id: track.id,
        audio: audioTrack,
    };
});

const createInitialState = tracks => tracks.map(track => ({
    ...track,
    isPlaying: false,
}));

const setPlayState = (id, state) => {
    const result = [...state];
    const targetIndex = state.findIndex(item => item.id === id);
    const currentIndex = state.findIndex(item => item.isPlaying === true);

    if (currentIndex !== -1 && currentIndex !== targetIndex) {
        result[targetIndex].isPlaying = true;
        result[currentIndex].isPlaying = false;
    } else if (currentIndex !== -1) {
        result[targetIndex].isPlaying = false;
    } else {
        result[targetIndex].isPlaying = true;
    }

    return result;
};


const useAudio = (tracks) => {
    const [audio, setAudio] = useState([]);
    const [state, setState] = useState(createInitialState(tracks));
    const setPlayStateById = id => setState(setPlayState(id, state));

    useEffect(() => setAudio(mapTracksToAudio(tracks)), []);

    useEffect(() => {
        audio.forEach((item, index) => state[index].isPlaying
            ? item.audio.play()
            : item.audio.pause()
        );
    }, [audio, state]);

    useEffect(() => {
        audio.forEach(item => item.audio.addEventListener('ended', () => setPlayStateById(item.id)));
    }, []);

    return [state, setPlayStateById];
};


export default useAudio;
