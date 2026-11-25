import { useSyncExternalStore } from 'react';
import type { Track } from '@/entities/release';
import { getStreamSource } from '../api';
import { createAudioEngine } from '../lib';

interface PlaybackState {
    track: Track | null,
    status: 'idle' | 'loading' | 'playing' | 'paused' | 'error',
}

const INITIAL_STATE: PlaybackState = { track: null, status: 'idle' };

let state = INITIAL_STATE;
let queue: Track[] = [];

const listeners = new Set<() => void>();

const setState = (next: PlaybackState) => {
    state = next;
    listeners.forEach(listener => listener());
};

const subscribe = (listener: () => void) => {
    listeners.add(listener);

    return () => {
        listeners.delete(listener);
    };
};

const getSnapshot = () => state;

const fail = (error: unknown) => {
    console.error('playback failed', error);
    setState({ ...state, status: 'error' });
};

const engine = createAudioEngine({
    onPlaying: () => setState({ ...state, status: 'playing' }),
    onPause: () => {
        if (state.status === 'playing') {
            setState({ ...state, status: 'paused' });
        }
    },
    onEnded: () => playNext(),
    onError: fail,
});

const play = async (track: Track) => {
    const isCurrent = track === state.track;

    if (isCurrent && state.status === 'loading') {
        return;
    }

    try {
        if (isCurrent && state.status === 'paused') {
            await engine.resume();
            return;
        }

        engine.pause();
        engine.unlock();
        setState({ track, status: 'loading' });

        const source = await getStreamSource(track);

        if (state.track === track) {
            await engine.play(source);
        }
    } catch (error) {
        if (state.track === track) {
            fail(error);
        }
    }
};

const pause = () => engine.pause();

const playNext = () => {
    const index = queue.findIndex(track => track === state.track);
    const next = queue[(index + 1) % queue.length];

    if (next) {
        void play(next);
    }
};

const setQueue = (tracks: Track[]) => {
    queue = tracks;
};

export const usePlayback = () => ({
    ...useSyncExternalStore(subscribe, getSnapshot),
    play,
    pause,
    setQueue,
});
