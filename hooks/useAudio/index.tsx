import { ReactNode, useEffect, useRef, useState } from 'react';
import { Track } from '../../types';

type TrackState = Track & { isPlaying: boolean };

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

export const useAudio = (sources: Track[], resolveUrl = async (track: Track) => track): [
    tracks: TrackState[],
    setTrackState: (id: number) => void,
    audioElement: React.FC<{}>,
] => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [tracks, setState] = useState(createInitialState(sources));
    const [isAudioInitialized, setAudioInitialized] = useState(false);

    const setStateById = (id: number) => setState(setPlayState(id, tracks));

    // safari doesn't allow to start audio playback without user interaction
    // so here we init the audio player instance with a short silent audio file
    // then we're ready to play some fine tunes
    useEffect(() => {
        if (isAudioInitialized) {
            return;
        }

        const initAudio = () => {
            if (audioRef.current) {
                audioRef.current.src = 'data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA==';
                audioRef.current.muted = false;
                audioRef.current.play();

                setAudioInitialized(true);
            }

            window.removeEventListener('touchstart', initAudio);
        };

        window.addEventListener('touchstart', initAudio);

        return () => window.removeEventListener('touchstart', initAudio);
    }, [isAudioInitialized]);

    useEffect(() => {
        const audio = audioRef.current;
        const next = tracks.find(track => track.isPlaying);

        if (audio) {
            audio.pause();
        }

        if (next) {
            resolveUrl(next).then(({ url }) => {
                if (!audio) {
                    console.log('no audio instance found');
                    return;
                }

                if (!url) {
                    console.log('invalid url');
                    return;
                }

                audio.src = url;
                audio.play();

                audio.addEventListener('ended', () => {
                    const currentTrackIndex = tracks.findIndex(track => track.isPlaying);
                    const nextTrackIndex = (currentTrackIndex + 1) % tracks.length;
                    const nextTrackId = tracks[nextTrackIndex].id;

                    setState(setPlayState(nextTrackId, tracks));
                });
            });
        }
    }, [tracks, resolveUrl]);

    return [
        tracks,
        setStateById,
        () => <audio ref={audioRef} />,
    ];
};
