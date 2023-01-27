import { get, store } from '../storage';


enum GrantTypes {
    Refresh = 'refresh_token',
    Credentials = 'client_credentials'
};


const table = String(process.env.AMAZON_TABLE);

const storeToDb = store(table);
const getFromDb = get(table);


const getDefaultParams = () => {
    const client_id = process.env.CLIENT_ID;
    const client_secret = process.env.CLIENT_SECRET;

    if (!client_id || !client_secret) {
        throw Error('Invalid soundcloud client_id or client_secret');
    }

    return {
        client_id,
        client_secret,
    };
};

const paramsToString = (obj: any) => Object.entries(obj).map(entry => entry.join('=')).join('&');

const requestToken = (body: { [k: string]: any }) => {
    const url = 'https://api.soundcloud.com/oauth2/token';

    const options = {
        headers: {
            'accept': 'application/json;charset=utf-8',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        body: paramsToString({
            ...getDefaultParams(),
            ...body,
        }),
    };

    return fetch(url, options)
        .then(response => response.json())
        .then(response => { console.log('request token response:', response); return response; })
        .then(response => ({
            accessToken: String(response.access_token),
            refreshToken: String(response.refresh_token),
            expireDate: Date.now() + (response.expires_in * 1000),
        }));
};


const cache = new Map();

const cacheToken = (obj: { [k: string]: any }) => {
    Object.entries(obj).forEach(entry => cache.set(...entry));

    return obj;
};

const getCachedToken = () => {
    if (cache.has('accessToken')) {
        return {
            expireDate: cache.get('expireDate'),
            accessToken: cache.get('accessToken'),
            refreshToken: cache.get('refreshToken'),
        };
    }

    return null;
};


export const getAccessToken = async () => {
    console.log('soundcloud access token was requested');

    const token = getCachedToken() || await getFromDb(['expireDate', 'accessToken', 'refreshToken']).then(cacheToken);

    if (!token) {
        console.log('no access token found. requesting the new one');

        return requestToken({
            grant_type: GrantTypes.Credentials,
        })
            .then(storeToDb)
            .then(cacheToken)
            .then(response => response.accessToken)
            .catch(error => console.log('error requesting access token', error));
    }

    if (token.expireDate <= Date.now()) {
        console.log('access token is expired. refreshing it');

        return requestToken({
            refresh_token: token.refreshToken,
            grant_type: GrantTypes.Refresh,
        })
            .then(storeToDb)
            .then(cacheToken)
            .then(response => response.accessToken)
            .catch(error => console.log('error refreshing access token', error));
    }

    console.log('current access token is', token.accessToken);

    return cache.get('accessToken');
};
