const DEFAULT_PLAYER_PARAMS = {
    color: '113322',
    auto_play: false,
    hide_related: true,
    show_comments: true,
    show_user: false,
    show_reposts: false,
    show_artwork: false,
};

const PROPS_TO_PARAMS_MAP = {
    autoPlay: 'auto_play',
    hideRelated: 'hide_related',
    showComments: 'show_comments',
    showUser: 'show_user',
    showReposts: 'show_reposts',
    showArtwork: 'show_artwork',
};


const getPlayerUrlParams = (props, params = DEFAULT_PLAYER_PARAMS) => {
    const propKeys = Object.keys(props);

    const mappedProps = propKeys.reduce((result, key) => {
        const mappedKey = PROPS_TO_PARAMS_MAP[key] || key;

        return {...result, [mappedKey]: props[key]};
    }, {});

    return { ...params, ...mappedProps };
};

const getPlayerUrlWithParams = (url, params) => {
    const urlParams = getPlayerUrlParams(params);
    const urlParamsPairs = Object.entries(urlParams);

    return url + '&amp;' + urlParamsPairs.map(([key, value]) => `${key}=${value}`).join('&amp;');
};


const Player = ({url, width = '100%', height, ...params}) => (
    <iframe
        src={getPlayerUrlWithParams(url, params)}
        width={width}
        height={height}
        frameBorder="0"
    />
);


export default Player;