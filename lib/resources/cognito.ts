import { Construct } from "constructs";
import {
  AccountRecovery,
  ClientAttributes,
  CustomAttributeConfig,
  UserPool,
} from "aws-cdk-lib/aws-cognito";
import { CfnOutput, Duration, RemovalPolicy } from "aws-cdk-lib";

export class CdkCognitoProject extends Construct {
  readonly stackName: string;
  constructor(scope: Construct, id: string, stackName: string) {
    super(scope, id);
    this.stackName = stackName;
    this.init();
  }

  public init() {
    const projectUserPool = new UserPool(this, "project-userPool", {
      userPoolName: `SMGT-Project-${this.stackName}`,
      selfSignUpEnabled: true,
      signInAliases: {
        username: true,
      },
      standardAttributes: {
        email: {
          mutable: true,
          required: true,
        },
      },
      customAttributes: {
        description: {
          bind(): CustomAttributeConfig {
            return {
              dataType: "String",
              mutable: true,
              stringConstraints: {
                minLen: 1,
                maxLen: 1000,
              },
            };
          },
        },
        secretKey: {
          bind(): CustomAttributeConfig {
            return {
              dataType: "String",
              mutable: true,
              stringConstraints: {
                minLen: 1,
                maxLen: 2048,
              },
            };
          },
        },
        userAccountId: {
          bind(): CustomAttributeConfig {
            return {
              dataType: "String",
              mutable: true,
              stringConstraints: {
                minLen: 1,
                maxLen: 255,
              },
            };
          },
        },
      },
      passwordPolicy: {
        minLength: 8,
        requireDigits: true,
        requireLowercase: true,
        requireUppercase: true,
        requireSymbols: true,
      },
      signInCaseSensitive: false,
      accountRecovery: AccountRecovery.NONE,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const client = projectUserPool.addClient("project-appClient", {
      userPoolClientName: `SMGT-AppClient-${this.stackName}`,
      generateSecret: true,
      authFlows: {
        userPassword: true,
      },
      authSessionValidity: Duration.minutes(3),
      preventUserExistenceErrors: true,
      idTokenValidity: Duration.days(1),
      accessTokenValidity: Duration.days(1),
      refreshTokenValidity: Duration.days(3650),
      readAttributes: new ClientAttributes()
        .withStandardAttributes({ email: true })
        .withCustomAttributes("description", "secretKey", "userAccountId"),
      writeAttributes: new ClientAttributes()
        .withStandardAttributes({ email: true })
        .withCustomAttributes("description", "secretKey", "userAccountId"),
      enableTokenRevocation: true,
    });

    new CfnOutput(this, "projectUserPoolId", {
      value: projectUserPool.userPoolId,
      key: "projectUserPoolId",
    });
    new CfnOutput(this, "projectUserPoolClientId", {
      value: client.userPoolClientId,
      key: "projectUserPoolClientId",
    });
    new CfnOutput(this, "projectPoolClientSecret", {
      value: client.userPoolClientSecret.unsafeUnwrap(),
      key: "projectPoolClientSecret",
    });
    return;
  }
}
