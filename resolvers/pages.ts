import { PAGE_IDS } from '../constants';

import mainPage from '../data/pages/main.json';
import socialLinks from '../data/pages/social.json';

import type { Section } from '../types';


const DATA_MAP = {
    [PAGE_IDS.MAIN]: mainPage as Section[],
};


export const getPageDataById = async (pageId: string): Promise<Section[] | null> => {
    return DATA_MAP[pageId] || null;
};

export const getSocialLinks = async (): Promise<{ [key: string]: string }> => {
    return socialLinks;
};
