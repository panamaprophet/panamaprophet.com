import { getEnv } from './index';
import { Track } from '../types';


type AccessToken = {
    access_token?: string,
    errors?: ({ message: string })[],
};


const resolveAccessToken = (clientId: string, clientSecret: string, grantType = 'client_credentials'): Promise<AccessToken> => {
    const options = {
        headers: {
            'accept': 'application/json;charset=utf-8',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        body: `client_id=${clientId}&client_secret=${clientSecret}&grant_type=${grantType}`,
    };

    return fetch(`https://api.soundcloud.com/oauth2/token`, options).then(response => response.json());
};

const resolveUrl = (access_token: string) => (url: string) => {
    const headers = {
        'accept': 'application/json;charset=utf-8',
        'Authorization': `OAuth ${access_token}`,
    };

    return fetch(`https://api.soundcloud.com/resolve?url=${url}`, { headers }).then(response => response.json());
};

const resolveStreamUrls = (access_token: string) => (track: Track): Promise<string> => {
    const headers = {
        'accept': 'application/json;charset=utf-8',
        'Authorization': `OAuth ${access_token}`,
    };

    return fetch(`https://api.soundcloud.com/tracks/${track.id}/streams`, { headers })
        .then(response => response.json())
        .then(response => response.http_mp3_128_url);
}

export const getTracksData = async (urls: string[]): Promise<Track[] | null> => {
    const { clientId, clientSecret } = getEnv();
    const { access_token, errors } = await resolveAccessToken(clientId, clientSecret);

    if (!access_token || errors) {
        return null;
    }

    const resolvedTracks = await Promise.all(urls.map(resolveUrl(access_token)));

    const tracks: Track[] = resolvedTracks.reduce((result, item, index) => {
        const items: Track[] = item.kind === 'playlist' ? item.tracks : [item];

        return [
            ...result,
            ...items.map(({ id, title, duration }) => ({ id, title, duration, playlist: urls[index] }))
        ];
    }, []);

    const streams = await Promise.all(tracks.map(resolveStreamUrls(access_token)));

    return tracks.map((track, index) => ({ ...track, url: streams[index] }));
};
