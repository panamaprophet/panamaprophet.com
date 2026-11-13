import type { Track } from '@/entities/track';
import type { AudioSource } from '@/shared/lib/audio';

const API_URL = (import.meta.env.VITE_STREAM_API_URL ?? '').replace(/\/+$/, '');

const get = async <T>(path: string): Promise<T> => {
    const response = await fetch(`${API_URL}${path}`);

    if (!response.ok) {
        throw new Error(`GET ${path} failed with ${response.status}`);
    }

    return response.json();
};

export const getStreamSource = ({ url }: Track) => get<AudioSource>(`/api/stream?url=${encodeURIComponent(url)}`);
