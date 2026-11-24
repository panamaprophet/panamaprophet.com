export type Duration = `${number}:${number}${number}`;

export interface Track {
    title: string,
    duration: Duration,
    url: string,
}

export interface Release {
    title: string,
    description: string,
    media: {
        image?: string,
        video?: string,
    },
    tracks?: Track[],
    links?: Record<string, string>,
}
