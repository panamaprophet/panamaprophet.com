import { useSyncExternalStore } from 'react';
import type { Track } from '@/entities/track';
import { createAudioEngine, type AudioEngine } from '@/shared/lib/audio';
import { getStreamSource } from '../api';

export type PlaybackStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'error';

export interface PlaybackState {
    track: Track | null,
    status: PlaybackStatus,
}

const INITIAL_STATE: PlaybackState = { track: null, status: 'idle' };

let state = INITIAL_STATE;
let queue: Track[] = [];
let engine: AudioEngine | null = null;
let session = 0;
let retriesLeft = 0;

const MAX_RETRIES = 1;

const listeners = new Set<() => void>();

const setState = (patch: Partial<PlaybackState>) => {
    state = { ...state, ...patch };
    listeners.forEach(listener => listener());
};

const getEngine = () => engine ??= createAudioEngine({
    onEnded: () => {
        if (state.track !== null && state.status !== 'loading') {
            playNext();
        }
    },
    onError: error => handleError(error),
    onPlayingChange: isPlaying => {
        if (state.status !== 'playing' && state.status !== 'paused') {
            return;
        }

        setState({ status: isPlaying ? 'playing' : 'paused' });
    },
});

const start = async (track: Track) => {
    const current = ++session;
    const audio = getEngine();

    audio.unlock();
    setState({ track, status: 'loading' });

    try {
        const source = await getStreamSource(track);

        if (current !== session) {
            return;
        }

        await audio.load(source);

        if (current !== session) {
            return;
        }

        await audio.play();

        if (current === session) {
            setState({ status: 'playing' });
        }
    } catch (error) {
        if (current === session) {
            handleError(error);
        }
    }
};

const startFresh = (track: Track) => {
    retriesLeft = MAX_RETRIES;
    void start(track);
};

const handleError = (error: unknown) => {
    if (state.track === null || state.status === 'error') {
        return;
    }

    if (retriesLeft > 0) {
        retriesLeft--;
        void start(state.track);
        return;
    }

    console.error('playback failed', error);
    session++;
    getEngine().pause();
    setState({ status: 'error' });
};

const playNext = () => {
    const index = queue.findIndex(track => track.url === state.track?.url);
    const next = queue[(index + 1) % queue.length];

    if (next) {
        startFresh(next);
    }
};

const toggle = (track: Track) => {
    const audio = getEngine();

    if (track.url !== state.track?.url || state.status === 'idle' || state.status === 'error') {
        startFresh(track);
        return;
    }

    if (state.status === 'paused') {
        retriesLeft = MAX_RETRIES;
        audio.play().catch(handleError);
        return;
    }

    if (state.status === 'loading') {
        session++;
        audio.pause();
        setState({ track: null, status: 'idle' });
        return;
    }

    audio.pause();
    setState({ status: 'paused' });
};

const setQueue = (tracks: Track[]) => {
    queue = tracks;
};

export const playback = {
    subscribe: (listener: () => void) => {
        listeners.add(listener);

        return () => {
            listeners.delete(listener);
        };
    },
    getSnapshot: () => state,
    setQueue,
    toggle,
};

export const usePlayback = () => useSyncExternalStore(playback.subscribe, playback.getSnapshot);
