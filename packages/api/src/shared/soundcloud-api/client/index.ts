import { getAccessToken } from '../auth/index.ts';

const API_URL = 'https://api.soundcloud.com';

export interface StreamSource {
    url: string,
    protocol: 'hls' | 'progressive',
}

interface Resource {
    kind: string,
    id: number,
}

interface Streams {
    hls_aac_160_url?: string,
    hls_aac_96_url?: string,
    preview_mp3_128_url?: string,
}

const request = async (url: string, init: RequestInit = {}) => fetch(url, {
    ...init,
  headers: {
    'accept': 'application/json; charset=utf-8',
    'authorization': `OAuth ${await getAccessToken()}`,
  },
});

const getJson = async <T>(path: string): Promise<T | null> => {
    const response = await request(`${API_URL}${path}`);

    if (response.status === 404) {
        return null;
    }

    if (!response.ok) {
        throw new Error(`SoundCloud responded ${response.status} for ${path}`);
    }

    return response.json() as Promise<T>;
};

const toPlayableUrl = async (url: string) => {
    if (!url.startsWith(`${API_URL}/`)) {
        return url;
    }

    const response = await request(url, { redirect: 'manual' });
    const location = response.headers.get('location');

    await response.body?.cancel();

    if (!location) {
        throw new Error(`Expected a redirect to a signed stream URL, got ${response.status}`);
    }

    return new URL(location, url).href;
};

export const getStreamSource = async (trackUrl: string): Promise<StreamSource | null> => {
    const resource = await getJson<Resource>(`/resolve?url=${encodeURIComponent(trackUrl)}`);

    if (resource?.kind !== 'track') {
        return null;
    }

    const streams = await getJson<Streams>(`/tracks/soundcloud:tracks:${resource.id}/streams`);
    const hls = streams?.hls_aac_160_url || streams?.hls_aac_96_url;

    if (hls) {
        return { url: await toPlayableUrl(hls), protocol: 'hls' };
    }

    if (streams?.preview_mp3_128_url) {
        return { url: await toPlayableUrl(streams.preview_mp3_128_url), protocol: 'progressive' };
    }

    return null;
};
