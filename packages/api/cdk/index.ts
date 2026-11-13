import path from 'node:path';
import { App, CfnOutput, Duration, Stack } from 'aws-cdk-lib';
import { CorsHttpMethod, HttpApi, HttpMethod } from 'aws-cdk-lib/aws-apigatewayv2';
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import { Architecture, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';

import { PARAMETERS } from '../src/shared/soundcloud-api/index.ts';

const app = new App();

const stack = new Stack(app, 'www-panamaprophet-com', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: app.node.getContext('region'),
  },
});

const api = new HttpApi(stack, 'api', {
    corsPreflight: {
        allowOrigins: app.node.getContext('allowedOrigins'),
        allowMethods: [CorsHttpMethod.GET],
    },
});

const parameter = (name: keyof typeof PARAMETERS) => {
  return StringParameter.fromSecureStringParameterAttributes(stack, name, {
    parameterName: PARAMETERS[name],
  });
};

const credentials = [parameter('clientId'), parameter('clientSecret')];
const token = parameter('token');

const handler = new NodejsFunction(stack, `stream-handler`, {
    entry: path.join(import.meta.dirname, '../src/handlers/index.ts'),
    handler: 'stream',
    runtime: Runtime.NODEJS_24_X,
    architecture: Architecture.ARM_64,
    timeout: Duration.seconds(10),
});

for (const secret of [...credentials, token]) {
    secret.grantRead(handler);
}

token.grantWrite(handler);

api.addRoutes({
    path: `/api/stream`,
    methods: [HttpMethod.GET],
    integration: new HttpLambdaIntegration(`stream-integration`, handler),
});

new CfnOutput(stack, 'url', { value: api.apiEndpoint });
