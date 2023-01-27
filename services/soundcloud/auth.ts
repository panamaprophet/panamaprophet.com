import { get, store } from '../storage';
import { getCachedToken, cacheToken } from './cache';


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

const sendRequest = (body: { [k: string]: any }) => {
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
        .then(response => ({
            accessToken: String(response.access_token),
            refreshToken: String(response.refresh_token),
            expireDate: Date.now() + (response.expires_in * 1000),
        }));
};

const requestToken = () => sendRequest({
    grant_type: GrantTypes.Credentials,
})
    .then(storeToDb)
    .then(cacheToken)
    .then(response => response.accessToken)
    .catch(error => console.log('error requesting access token', error));

const refreshToken = (refreshToken: string) => sendRequest({
    refresh_token: refreshToken,
    grant_type: GrantTypes.Refresh,
})
    .then(storeToDb)
    .then(cacheToken)
    .then(response => response.accessToken)
    .catch(error => console.log('error refreshing access token', error));

export const getAccessToken = async () => {
    console.log('soundcloud access token was requested');

    const token = getCachedToken() || await getFromDb(['expireDate', 'accessToken', 'refreshToken']).then(cacheToken);

    if (!token) {
        console.log('no access token found. requesting the new one');

        return requestToken();
    }

    if (token.expireDate <= Date.now()) {
        console.log('access token has expired. refreshing it');

        return refreshToken(token.refreshToken);
    }

    console.log('current access token is', token.accessToken);

    return token.accessToken;
};
