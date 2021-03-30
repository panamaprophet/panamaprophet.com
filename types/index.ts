export type SectionEntity = {
    image?: string,
    video?: string,
    title: string,
    description: string[],
    playlist?: string,
};

export type SectionAlign = 'left' | 'right';

export type Track = {
    id: number,
    title: string,
    duration: number,
    url: string,
    playlist: string,
};

export type TrackState = Track & { isPlaying: boolean };

export type TrackAudioState = {
    id: number,
    audio: HTMLAudioElement,
};
