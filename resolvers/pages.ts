import mainPage from '../data/pages/main.json';
import socialLinks from '../data/pages/social.json';
import * as Types from '../types';


const DATA_MAP: { [k: string]: Types.Section[] } = {
    main: mainPage as Types.Section[],
}


export const getPageDataById = (pageId: string): Types.Section[] | null => DATA_MAP[pageId] || null;

export const getSocialLinks = (): { [key: string]: string } => socialLinks;
