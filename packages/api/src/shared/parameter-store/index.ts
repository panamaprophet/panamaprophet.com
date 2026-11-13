import { GetParametersCommand, PutParameterCommand, SSMClient } from '@aws-sdk/client-ssm';

const client = new SSMClient({});

export const put = (name: string, value: string) => client.send(new PutParameterCommand({
    Name: name,
    Value: value,
    Type: 'SecureString',
    Overwrite: true,
  }));

export const get = (...names: string[]) => client.send(new GetParametersCommand({
  Names: names,
  WithDecryption: true,
}));
