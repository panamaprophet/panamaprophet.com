import mainPage from '../data/pages/main.json';
import socialLinks from '../data/pages/social.json';


export const getMainPageData = async () => {
    return mainPage;
};

export const getSocialLinks = async () => {
    return socialLinks;
};

export const getTracksData = async (urls, clientId) => {
    const baseUrl = `https://api.soundcloud.com/resolve?client_id=${clientId}`;

    const requestPromises = urls.map(url => fetch(`${baseUrl}&url=${url}`));
    const responses = await Promise.all(requestPromises);

    const parsedResponsePromises = responses.map(response => response.json());
    const parsedResponses = await Promise.all(parsedResponsePromises);

    const groups = parsedResponses.map(data => data.kind === 'playlist' ? data.tracks : [data]);

    const reducedTracks = groups.reduce((result, group, index) => {
        const reducedGroup = group.map(({id, title, duration, stream_url}) => ({
            id,
            title,
            duration,
        url: `${stream_url}?client_id=${clientId}`,
        }));

        return {
            ...result,
            [urls[index]]: reducedGroup,
        };
    }, {});

    return reducedTracks;
};
