import type { AWS } from "@serverless/typescript";

import hello from "@functions/hello";
import login from "@functions/login";
import register from "@functions/register";
import verifyEmail from "@functions/verify_email";

const serverlessConfiguration: AWS = {
  service: "carbon-footprint",
  frameworkVersion: "3",
  plugins: [
    "serverless-esbuild",
    "serverless-offline",
    "serverless-prune-plugin",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: "ap-south-1",
    stage: '${opt:stage,"staging"}',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: ["cognito-idp:*"],
        Resource:
          "arn:aws:cognito-idp:ap-south-1:721497630731:userpool/ap-south-1_a6uRy0VxX",
      },
    ],
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
  },
  // import the function via paths
  functions: { hello, login, register, verifyEmail },
  package: { individually: true },
  custom: {
    prune: {
      automatic: true,
      number: 0,
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
