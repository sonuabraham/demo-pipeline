import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Function, Code, Runtime } from "aws-cdk-lib/aws-lambda";
import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";

export class DemoLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const index = new Function(this, "LambdaFunction", {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset("lambda"),
      handler: "index.handler",
      environment: {
        acctid: Stack.of(this).account,
        region: Stack.of(this).region,
      },
    });

    const api = new LambdaRestApi(this, "DemoApiGwEndpoint", {
      handler: index,
    });
  }
}
