import { DynamoDBClient, BatchWriteItemCommand, BatchGetItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';


const client = new DynamoDBClient({
    credentials: {
        accessKeyId: String(process.env.AMAZON_ACCESS_KEY),
        secretAccessKey: String(process.env.AMAZON_SECRET_KEY),
    },
    region: String(process.env.AMAZON_REGION),
});


export const store = (table: string) => (data: { [k: string]: any }) => client.send(new BatchWriteItemCommand({
    RequestItems: {
        [table]: [
            ...Object.entries(data).map(([key, value]) => ({
                PutRequest: {
                    Item: marshall({ id: key, value }),
                },
            })),
        ],
    },
}))
    .then(result => result.$metadata.httpStatusCode === 200 ? data : Promise.reject('storing error'));

export const get = (table: string) => (keys: string | string[]) => client.send(new BatchGetItemCommand({
    RequestItems: {
        [table]: {
            Keys: Array.isArray(keys)
                ? keys.map(key => marshall({ id: key }))
                : [marshall({ id: keys })],
        },
    },
}))
    .then(response => response.Responses?.[table] || Promise.reject('no items found'))
    .then(response => response.reduce<{ [k: string]: any }>((acc, obj) => {
        const { id, value } = unmarshall(obj);

        return ({ ...acc, [id]: value });
    }, {}));
