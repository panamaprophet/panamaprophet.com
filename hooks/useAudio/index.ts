import { useEffect, useRef, useState } from 'react';
import { Track } from '../../types';


type TrackState = Track & { isPlaying: boolean };

type Options = {
    resolveUrl?: (track: Track) => Promise<Track>,
}


const createInitialState = (tracks: Track[]) => tracks.map(track => ({ ...track, isPlaying: false }));

const setPlayState = (id: number, state: TrackState[]) => {
    const result = [...state];

    const nextIndex = state.findIndex(track => track.id === id);
    const currentIndex = state.findIndex(track => track.isPlaying);

    if (currentIndex !== -1) {
        result[currentIndex].isPlaying = false;
    }

    if (nextIndex !== -1) {
        result[nextIndex].isPlaying = nextIndex !== currentIndex;
    }

    return result;
};


export const useAudio = (sources: Track[], userOptions: Options = {}): [TrackState[], (id: number) => void] => {
    const defaultOptions = {
        resolveUrl: async (track: Track) => track,
    };

    const options = { 
        ...defaultOptions, 
        ...userOptions 
    };

    const { resolveUrl } = options;
    const [tracks, setState] = useState(createInitialState(sources));
    const currentTrack = useRef<HTMLAudioElement | null>(null);

    const setStateById = (id: number) => setState(setPlayState(id, tracks));

    useEffect(() => {
        const currentAudio = currentTrack.current;
        const next = tracks.find(track => track.isPlaying);

        if (currentAudio) {
            currentAudio.pause();
        }

        if (next) {
            resolveUrl(next).then(({ url }) => {
                currentTrack.current = new Audio(url);
                currentTrack.current.play();
                currentTrack.current.addEventListener('ended', () => {
                    const currentTrackIndex = tracks.findIndex(track => track.isPlaying);
                    const nextTrackIndex = (currentTrackIndex + 1) % tracks.length;
                    const nextTrackId = tracks[nextTrackIndex].id;

                    setState(setPlayState(nextTrackId, tracks));
                });
            });
        }
    }, [tracks]);

    return [tracks, setStateById];
}
