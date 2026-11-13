import type { Track } from '@/entities/track/@x/release';

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
