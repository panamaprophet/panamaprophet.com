import {PAGE_IDS} from '../constants';

import mainPage from '../data/pages/main.json';
import socialLinks from '../data/pages/social.json';

import type {Section, Track} from '../types';


const DATA_MAP = {
    [PAGE_IDS.MAIN]: mainPage as Section[],
};


export const getPageDataById = async (pageId: string): Promise<Section[] | null> => {
    return DATA_MAP[pageId] || null;
};

export const getSocialLinks = async (): Promise<{[key: string]: string}> => {
    return socialLinks;
};

export const getTracksData = async (urls: string[], clientId: string): Promise<Track[] | null> => {
    if (!clientId) {
        return null;
    }

    const baseUrl = `https://api.soundcloud.com/resolve?client_id=${clientId}`;

    const requestPromises = urls.map(url => fetch(`${baseUrl}&url=${url}`).then(response => response.json()));
    const responses = await Promise.all(requestPromises);

    const groups = responses.map(data => data.kind === 'playlist' ? data.tracks : [data]);

    const tracks = groups.reduce((result, group, index) => ([
        ...result,
        ...group.map(({id, title, duration, stream_url}: {
            id: string,
            title: string,
            duration: string,
            stream_url: string,
        }) => ({
            id,
            title,
            duration,
            url: `${stream_url}?client_id=${clientId}`,
            playlist: urls[index],
        }), [])
    ]), []);

    return tracks;
};

export const getEnv = async (): Promise<{clientId: string, revalidationInterval: number}> => ({
    clientId: String(process.env.clientId),
    revalidationInterval: Number(process.env.revalidationInterval),
});
