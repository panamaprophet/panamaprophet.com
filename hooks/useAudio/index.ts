import {useEffect, useState} from 'react';

import type {Track, TrackState, TrackAudioState} from '../../types';


const mapTracksToAudio = (tracks: Track[]): TrackAudioState[] => tracks.map(track => {
    const audioTrack = new Audio();

    audioTrack.preload = 'none';
    audioTrack.src =  track.url;

    return {
        id: track.id,
        audio: audioTrack,
    };
});

const createInitialState = (tracks: Track[]): TrackState[] => tracks.map(track => ({
    ...track,
    isPlaying: false,
}));

const setPlayState = (id: number, state: TrackState[]): TrackState[] => {
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


const useAudio = (tracks: Track[]): [
    TrackState[],
    (id: number) => void
] => {
    const [audio, setAudio] = useState<TrackAudioState[]>([]);
    const [state, setState] = useState(createInitialState(tracks));
    const setPlayStateById = (id: number): void => setState(setPlayState(id, state));

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
