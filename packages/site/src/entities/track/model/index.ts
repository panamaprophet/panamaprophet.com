export type Duration = `${number}:${number}${number}`;

export interface Track {
    title: string,
    duration: Duration,
    url: string,
}
