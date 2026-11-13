import type { APIGatewayProxyStructuredResultV2 } from 'aws-lambda';

export const json = (statusCode: number, body: unknown, cacheControl = 'no-store'): APIGatewayProxyStructuredResultV2 => ({
  statusCode,
  headers: {
    'content-type': 'application/json',
    'cache-control': cacheControl,
  },
  body: JSON.stringify(body),
});
