import { Construct } from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import {
  AttributeType,
  BillingMode,
  ProjectionType,
  TableClass,
} from "aws-cdk-lib/aws-dynamodb";
import { CfnOutput, RemovalPolicy } from "aws-cdk-lib";

export class CdkDynamodb extends Construct {
  readonly stackName: string;
  constructor(scope: Construct, id: string, stackName: string) {
    super(scope, id);
    this.stackName = stackName;
    this.init();
  }

  public init() {
    this.userTable();
    this.projectTable();
    this.productTable();
    this.pricingPlansTable();
    this.subscriptionTable();
    this.transactionTable();
    this.billingRecordTable();
    this.errorTable();
  }

  private userTable() {
    const table = new dynamodb.Table(this, "SMGT-User-Dev", {
      tableName: `SMGT-User-${this.stackName}`,
      partitionKey: { name: "pk", type: AttributeType.STRING },
      sortKey: { name: "sk", type: AttributeType.STRING },
      tableClass: TableClass.STANDARD,
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
    });
    new CfnOutput(this, "userTable", {
      value: table.tableName,
      key: "userTableName",
    });
    new CfnOutput(this, "userTableArn", {
      value: table.tableArn,
      key: "userTableArn",
    });
  }

  private subscriptionTable() {
    const table = new dynamodb.Table(this, "SMGT-Subscription-Dev", {
      tableName: `SMGT-Subscription-${this.stackName}`,
      partitionKey: { name: "pk", type: AttributeType.STRING },
      sortKey: { name: "sk", type: AttributeType.STRING },
      tableClass: TableClass.STANDARD,
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    table.addGlobalSecondaryIndex({
      indexName: "RecurringPaymentIndex",
      partitionKey: { name: "projectId", type: AttributeType.STRING },
      sortKey: { name: "expiresAt", type: AttributeType.STRING },
      projectionType: ProjectionType.ALL,
    });

    new CfnOutput(this, "subscriptionTable", {
      value: table.tableName,
      key: "subscriptionTable",
    });
    new CfnOutput(this, "subscriptionTableArn", {
      value: table.tableArn,
      key: "subscriptionTableArn",
    });
  }

  private transactionTable() {
    const table = new dynamodb.Table(this, "SMGT-Transaction-Dev", {
      tableName: `SMGT-Transaction-${this.stackName}`,
      partitionKey: { name: "pk", type: AttributeType.STRING },
      sortKey: { name: "sk", type: AttributeType.STRING },
      tableClass: TableClass.STANDARD,
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    new CfnOutput(this, "transactionTable", {
      value: table.tableName,
      key: "transactionTable",
    });
    new CfnOutput(this, "transactionTableArn", {
      value: table.tableArn,
      key: "transactionTableArn",
    });
  }

  private projectTable() {
    const table = new dynamodb.Table(this, "SMGT-Project-Dev", {
      tableName: `SMGT-Project-${this.stackName}`,
      partitionKey: { name: "pk", type: AttributeType.STRING },
      sortKey: { name: "sk", type: AttributeType.STRING },
      tableClass: TableClass.STANDARD,
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    new CfnOutput(this, "projectTable", {
      value: table.tableName,
      key: "projectTable",
    });
    new CfnOutput(this, "projectTableArn", {
      value: table.tableArn,
      key: "projectTableArn",
    });
  }

  private productTable() {
    const table = new dynamodb.Table(this, "SMGT-Product-Dev", {
      tableName: `SMGT-Product-${this.stackName}`,
      partitionKey: { name: "pk", type: AttributeType.STRING },
      sortKey: { name: "sk", type: AttributeType.STRING },
      tableClass: TableClass.STANDARD,
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    new CfnOutput(this, "productTable", {
      value: table.tableName,
      key: "productTable",
    });
    new CfnOutput(this, "productTableArn", {
      value: table.tableArn,
      key: "productTableArn",
    });
  }

  private pricingPlansTable() {
    const table = new dynamodb.Table(this, "SMGT-PricingPlans-Dev", {
      tableName: `SMGT-PricingPlans-${this.stackName}`,
      partitionKey: { name: "pk", type: AttributeType.STRING },
      sortKey: { name: "sk", type: AttributeType.STRING },
      tableClass: TableClass.STANDARD,
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    new CfnOutput(this, "pricingPlansTable", {
      value: table.tableName,
      key: "pricingPlansTable",
    });
    new CfnOutput(this, "pricingPlansTableArn", {
      value: table.tableArn,
      key: "pricingPlansTableArn",
    });
  }

  private billingRecordTable() {
    const table = new dynamodb.Table(this, "SMGT-BillingRecords-Dev", {
      tableName: `SMGT-BillingRecords-${this.stackName}`,
      partitionKey: { name: "pk", type: AttributeType.STRING },
      sortKey: { name: "sk", type: AttributeType.STRING },
      tableClass: TableClass.STANDARD,
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    new CfnOutput(this, "billingRecordTable", {
      value: table.tableName,
      key: "billingRecordTable",
    });
    new CfnOutput(this, "billingRecordTableArn", {
      value: table.tableArn,
      key: "billingRecordTableArn",
    });
  }

  private errorTable() {
    const table = new dynamodb.Table(this, "SMGT-Error-Dev", {
      tableName: `SMGT-Error-${this.stackName}`,
      partitionKey: { name: "pk", type: AttributeType.STRING },
      sortKey: { name: "sk", type: AttributeType.STRING },
      tableClass: TableClass.STANDARD,
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    new CfnOutput(this, "errorTable", {
      value: table.tableName,
      key: "errorTable",
    });
    new CfnOutput(this, "errorTableArn", {
      value: table.tableArn,
      key: "errorTableArn",
    });
  }
}
