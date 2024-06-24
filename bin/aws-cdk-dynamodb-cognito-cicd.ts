#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { AwsCdkDynamodbCognitoCicdStack } from "../lib/aws-cdk-dynamodb-cognito-cicd-stack";

const app = new cdk.App();

new AwsCdkDynamodbCognitoCicdStack(app, "dev", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  stackName: "dev",
});

new AwsCdkDynamodbCognitoCicdStack(app, "qa", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  stackName: "qa",
});
