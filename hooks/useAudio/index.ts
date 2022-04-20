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


export const useAudio = (tracks: Track[]): [
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
        audio.forEach((item, index) => item.audio.addEventListener('ended', () => {
            setPlayStateById(item.id);

            const currentTrack = state[index];
            const playlistTracks = state.filter(track => track.playlist === currentTrack?.playlist);
            const currentIndex = playlistTracks.findIndex(track => track.id === currentTrack?.id);
            const nextTrack = playlistTracks[currentIndex + 1];

            if (nextTrack) {
                setPlayStateById(nextTrack.id);
            }
        }));
    }, [audio]);

    return [state, setPlayStateById];
};
