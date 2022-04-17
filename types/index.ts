export type Section = {
    title: string,
    description: string[],
    playlist?: string,
    links?: { [k: string]: string },
    image?: string,
    video?: string,
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
