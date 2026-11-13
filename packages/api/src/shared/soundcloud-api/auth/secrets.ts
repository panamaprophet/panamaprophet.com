import * as parameterStore from '../../parameter-store/index.ts';
import type { Token } from './index.ts';

export const PARAMETERS = {
  clientId: '/www-panamaprophet-com/soundcloud/client-id',
  clientSecret: '/www-panamaprophet-com/soundcloud/client-secret',
  token: '/www-panamaprophet-com/soundcloud/token',
} as const;

export interface Secrets {
  clientId: string,
  clientSecret: string,
  token: Token | null,
}

export const loadSecrets = async (): Promise<Secrets> => {
  const { Parameters = [] } = await parameterStore.get(...Object.values(PARAMETERS));

  const valueOf = (name: string) => Parameters.find((parameter) => parameter.Name === name)?.Value;

  const clientId = valueOf(PARAMETERS.clientId);
  const clientSecret = valueOf(PARAMETERS.clientSecret);
  const token = valueOf(PARAMETERS.token);

  if (!clientId || !clientSecret) {
    throw new Error(`SSM parameters ${PARAMETERS.clientId} and ${PARAMETERS.clientSecret} are required`);
  }

  return {
    clientId,
    clientSecret,
    token: token ? JSON.parse(token) as Token : null,
  };
};

export const saveToken = async (token: Token) => {
  return parameterStore.put(PARAMETERS.token, JSON.stringify(token));
};
