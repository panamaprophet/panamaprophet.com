import { getEnv } from './index';
import type { Track } from '../types';


type SoundCloudTrack = {
    id: string,
    title: string,
    duration: string,
    stream_url: string,
};

type AccessToken = {
    access_token?: string,
    errors?: ({ message: string })[],
};


const BASE_URL = 'https://api.soundcloud.com';
const ENDPOINT_TOKEN = '/oauth2/token';
const ENDPOINT_RESOLVE = '/resolve';


export const getAccessToken = (clientId: string, clientSecret: string, grantType = 'client_credentials'): Promise<AccessToken> => {
    const options = {
        headers: {
            'accept': 'application/json;charset=utf-8',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        body: `client_id=${clientId}&client_secret=${clientSecret}&grant_type=${grantType}`,
    };

    return fetch(`${BASE_URL}${ENDPOINT_TOKEN}`, options).then(response => response.json());
};

export const getTracksData = async (urls: string[]): Promise<Track[] | null> => {
    const env = await getEnv();
    const { access_token, errors } = await getAccessToken(env.clientId, env.clientSecret);

    if (!access_token || errors) {
        return null;
    }

    const headers = {
        'accept': 'application/json;charset=utf-8',
        'Authorization': `OAuth ${access_token}`,
    };

    const requestPromises = urls.map(url => fetch(`${BASE_URL}${ENDPOINT_RESOLVE}?url=${url}`, { headers }).then(response => response.json()));
    const responses = await Promise.all(requestPromises);

    const groups = responses.map(data => data.kind === 'playlist' ? data.tracks : [data]);

    const tracks = groups.reduce((result: Track[], group: SoundCloudTrack[], index) => ([
        ...result,
        ...group.map(({ id, title, duration, stream_url }) => ({
            id,
            title,
            duration,
            url: `${stream_url}?client_id=${env.clientId}`,
            playlist: urls[index],
        }), [])
    ]), []);

    return tracks;
};
