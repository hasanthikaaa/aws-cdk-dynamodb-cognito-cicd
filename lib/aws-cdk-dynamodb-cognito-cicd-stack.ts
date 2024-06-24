import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { CdkCognitoProject } from "./resources/cognito";
import { CdkDynamodb } from "./resources/dynamodb";

export class AwsCdkDynamodbCognitoCicdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    new CdkCognitoProject(
      this,
      "CdkCognitoProject",
      props?.stackName as string,
    );
    new CdkDynamodb(this, "CdkDynamoDB", props?.stackName as string);
  }
}
