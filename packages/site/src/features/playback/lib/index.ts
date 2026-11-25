import type Hls from 'hls.js';

export interface AudioSource {
    url: string,
    protocol: 'hls' | 'progressive',
}

const HLS_MIME_TYPE = 'application/vnd.apple.mpegurl';
const SILENCE = 'data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA==';

interface Events {
    onEnded: () => void,
    onError: (error: unknown) => void,
    onPlayingChange: (isPlaying: boolean) => void,
}

export const createAudioEngine = ({ onEnded, onError, onPlayingChange }: Events) => {
    const audio = new Audio();
    let hls: Hls | null = null;
    let isUnlocked = false;
    let isSilence = false;
    let loadId = 0;
    let failedLoadId = -1;

    const reportError = (error: unknown) => {
        if (isSilence || failedLoadId === loadId) {
            return;
        }

        failedLoadId = loadId;
        onError(error);
    };

    audio.addEventListener('ended', () => !isSilence && onEnded());
    audio.addEventListener('error', () => reportError(audio.error));
    audio.addEventListener('playing', () => !isSilence && onPlayingChange(true));
    audio.addEventListener('pause', () => !isSilence && onPlayingChange(false));

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

        async load({ url, protocol }: AudioSource) {
            const id = ++loadId;

            hls?.destroy();
            hls = null;
            isSilence = false;

            const canPlayHlsNatively = audio.canPlayType(HLS_MIME_TYPE) !== '';

            if (protocol === 'progressive' || (canPlayHlsNatively && !('MediaSource' in window))) {
                audio.src = url;
                return;
            }

            const { default: HlsPlayer } = await import('hls.js/light');

            if (id !== loadId) {
                return;
            }

            if (!HlsPlayer.isSupported()) {
                if (!canPlayHlsNatively) {
                    throw new Error('HLS playback is not supported in this browser');
                }

                audio.src = url;
                return;
            }

            hls = new HlsPlayer();
            hls.on(HlsPlayer.Events.ERROR, (_event, data) => data.fatal && reportError(data));
            hls.attachMedia(audio);
            hls.loadSource(url);
        },

        play: () => audio.play(),

        pause: () => audio.pause(),
    };
};
