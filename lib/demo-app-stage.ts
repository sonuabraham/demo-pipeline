import { Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { DemoLambdaStack } from "./demo-lambda-stack";

export class DemoPipelineAppStage extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);
    const LambdaStack = new DemoLambdaStack(this, "LambdaStack");
  }
}
