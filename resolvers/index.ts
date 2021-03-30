import {PAGE_IDS} from '../constants';

import mainPage from '../data/pages/main.json';
import socialLinks from '../data/pages/social.json';

import type {SectionEntity, Track} from '../types';


const DATA_MAP: Record<string, SectionEntity[]> = {
    [PAGE_IDS.MAIN]: mainPage,
};


export const getPageDataById = async (pageId: string): Promise<SectionEntity[] | null> => {
    return DATA_MAP[pageId] || null;
};

export const getSocialLinks = async (): Promise<Record<string, string>> => {
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
