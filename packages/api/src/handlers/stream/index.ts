import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import { json } from '../../shared/response/index.ts';
import { getStreamSource } from '../../shared/soundcloud-api/index.ts';

export const handler = async ({ queryStringParameters }: APIGatewayProxyEventV2) => {
  const url = queryStringParameters?.url ?? '';

  if (URL.parse(url)?.hostname !== 'soundcloud.com') {
    return json(400, { error: 'Expected a soundcloud.com track url' });
  }

  const source = await getStreamSource(url);

  return source
    ? json(200, source)
    : json(404, { error: 'No playable stream' });
};
