import { Track } from '../../types';
import { getAccessToken } from './auth';


export const resolveUrl = async (url: string) => {
    const accessToken = await getAccessToken();

    const headers = {
        'accept': 'application/json;charset=utf-8',
        'Authorization': `OAuth ${accessToken}`,
    };

    return fetch(`https://api.soundcloud.com/resolve?url=${url}`, { headers }).then(response => response.json());
};

export const resolveStreamUrl = async (track: Pick<Track, 'id'>): Promise<string> => {
    const accessToken = await getAccessToken();

    const headers = {
        'accept': 'application/json;charset=utf-8',
        'Authorization': `OAuth ${accessToken}`,
    };

    return fetch(`https://api.soundcloud.com/tracks/${track.id}/streams`, { headers })
        .then(response => response.json())
        .then(response => response.http_mp3_128_url);
};

export const resolveTracks = async (urls: string[]): Promise<Track[] | null> => {
    const accessToken = await getAccessToken();

    if (!accessToken) {
        console.log('no access token');
        return [];
    }

    const resolvedTracks = await Promise.all(urls.map(resolveUrl));

    const tracks: Track[] = resolvedTracks.reduce((result, item, index) => {
        const items: Track[] = item.kind === 'playlist' ? item.tracks : [item];

        return [
            ...result,
            ...items.map(({ id, title, duration }) => ({ id, title, duration, playlist: urls[index] }))
        ];
    }, []);

    return tracks;
};
