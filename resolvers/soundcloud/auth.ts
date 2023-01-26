enum GrantTypes {
    Refresh = 'refresh_token',
    Credentials = 'client_credentials'
};


let accessToken: string | null = null;
let refreshToken: string | null = null;
let expireDate: number | null = null;

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
            accessToken = String(response.access_token);
            refreshToken = String(response.refresh_token);
            expireDate = Date.now() + (response.expires_in * 1000);

            return accessToken;
        });
};

const refresh = () => requestToken({ refresh_token: refreshToken, grant_type: GrantTypes.Refresh });

const init = () => requestToken({ grant_type: GrantTypes.Credentials });


export const getAccessToken = async () => {
    if (!expireDate || !accessToken) {
        return init();
    }

    if (expireDate <= Date.now()) {
        return refresh();
    }

    return accessToken;
};
