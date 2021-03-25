import mainPage from '../data/pages/main.json';
import socialLinks from '../data/pages/social.json';


export const getMainPageData = async () => {
    return mainPage;
}

export const getSocialLinks = async () => {
    return socialLinks;
}
