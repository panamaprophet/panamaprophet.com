const token: { [k: string]: string | null } = {
    access: null,
    refresh: null,
};


const getHeaders = () => ({
    'accept': 'application/json;charset=utf-8',
    'Content-Type': 'application/x-www-form-urlencoded',
});

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

const requestToken = (body: { [k: string]: unknown }) => {
    const url = 'https://api.soundcloud.com/oauth2/token';

    const options = {
        headers: getHeaders(),
        method: 'POST',
        body: paramsToString({
            ...getDefaultParams(),
            ...body,
        }),
    };

    return fetch(url, options)
        .then((response) => response.json())
        .then((response) => {
            token.access = String(response.access_token);
            token.refresh = String(response.refresh_token);

            setTimeout(refresh, response.expires_in * 1000);

            return token.access;
        });
};

const refresh = () => requestToken({ refresh_token: token.refresh, grant_type: 'refresh_token' });

const init = () => requestToken({ grant_type: 'client_credentials' });


export const getAccessToken = async () => token.access || init();
