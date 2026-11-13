import { loadSecrets, saveToken, type Secrets } from './secrets.ts';

const TOKEN_URL = 'https://secure.soundcloud.com/oauth/token';

export interface Token {
  accessToken: string,
  refreshToken: string | null,
  expiresAt: number,
}

let token: Token | null = null;

const requestToken = async (grant: Record<string, string>, headers: Record<string, string> = {}) => {
  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      'accept': 'application/json; charset=utf-8',
      'content-type': 'application/x-www-form-urlencoded',
      ...headers,
    },
    body: new URLSearchParams(grant),
  });

  if (!response.ok) {
    throw new Error(`SoundCloud token request (${grant.grant_type}) failed with ${response.status}`);
  }

  const { access_token, refresh_token, expires_in = 3600 } = await response.json() as {
    access_token?: string,
    refresh_token?: string,
    expires_in?: number,
  };

  if (!access_token) {
    throw new Error('SoundCloud token response has no access_token');
  }

  return {
    accessToken: access_token,
    refreshToken: refresh_token ?? null,
    expiresAt: Date.now() + expires_in * 1000,
  };
};

const issueToken = async ({ clientId, clientSecret, token }: Secrets) => {
  if (token?.refreshToken) {
    const refreshed = await requestToken({
      grant_type: 'refresh_token',
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: token.refreshToken,
    }).catch((error) => {
      console.warn('refreshing the SoundCloud token failed, requesting a new one', error);
    });

    if (refreshed) {
        return refreshed;
    }
  }

  return requestToken({ grant_type: 'client_credentials' }, {
    authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
  });
};

const isValid = (token: Token | null): token is Token => {
  return token !== null && token.expiresAt > Date.now();
};

const renew = async (secrets: Secrets) => {
  const next = await issueToken(secrets);

  await saveToken(next).catch((error) => {
    console.warn('storing the SoundCloud token failed', error);
  });

  return next;
};

export const getAccessToken = async () => {
  if (isValid(token)) {
    return token.accessToken;
  }

  const secrets = await loadSecrets();

  token = isValid(secrets.token) ? secrets.token : await renew(secrets);

  return token.accessToken;
};
