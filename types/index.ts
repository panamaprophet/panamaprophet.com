export type Section = {
    title: string,
    description: string[],
    playlist?: string,
    links?: { [k: string]: string },
    image?: { src: string },
    video?: { src: string },
};

export type Track = {
    id: number,
    title: string,
    duration: number,
    url?: string,
    playlist: string,
};
