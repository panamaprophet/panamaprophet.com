export type Section = {
    image?: string,
    video?: string,
    title: string,
    description: string[],
    playlist?: string,
};

export type Track = {
    id: number,
    title: string,
    duration: number,
    url: string,
    playlist: string,
};

export type TrackState = Track & {
    isPlaying: boolean,
};

export type TrackAudioState = {
    id: number,
    audio: HTMLAudioElement,
};
