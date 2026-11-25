import type Hls from 'hls.js';

export interface AudioSource {
    url: string,
    protocol: 'hls' | 'progressive',
}

const SILENCE = 'data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA==';

interface Events {
    onPlaying: () => void,
    onPause: () => void,
    onEnded: () => void,
    onError: (error: unknown) => void,
}

export const createAudioEngine = ({ onPlaying, onPause, onEnded, onError }: Events) => {
    const audio = new Audio();
    let hls: Hls | null = null;
    let loadId = 0;
    let isUnlocked = false;
    let isSilence = false;

    audio.addEventListener('playing', () => !isSilence && onPlaying());
    audio.addEventListener('pause', () => !isSilence && onPause());
    audio.addEventListener('ended', () => !isSilence && onEnded());
    audio.addEventListener('error', () => onError(audio.error));

    return {
        unlock() {
            if (isUnlocked) {
                return;
            }

            isUnlocked = true;
            isSilence = true;
            audio.src = SILENCE;
            audio.play().catch(() => {});
        },

        async play({ url, protocol }: AudioSource) {
            const id = ++loadId;

            hls?.destroy();
            hls = null;
            isSilence = false;

            if (protocol === 'progressive' || !('MediaSource' in window)) {
                audio.src = url;
            } else {
                const { default: HlsPlayer } = await import('hls.js/light');

                if (id !== loadId) {
                    return;
                }

                hls = new HlsPlayer();
                hls.on(HlsPlayer.Events.ERROR, (_event, data) => data.fatal && onError(data));
                hls.attachMedia(audio);
                hls.loadSource(url);
            }

            await audio.play();
        },

        resume: () => audio.play(),

        pause: () => audio.pause(),
    };
};
