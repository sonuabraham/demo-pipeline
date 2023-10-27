import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from "aws-cdk-lib/pipelines";

import { DemoPipelineAppStage } from "./demo-app-stage";

export class DemoPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, "Pipeline", {
      pipelineName: "DemoPipeline",
      crossAccountKeys: true,
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub("sonuabraham/demo-pipeline", "main"),
        commands: ["npm ci", "npm run build", "npx cdk synth"],
      }),
    });
    pipeline.addStage(
      new DemoPipelineAppStage(this, "DEV", {
        env: { account: "716466354371", region: "us-east-1" },
      })
    );

    pipeline.addStage(
      new DemoPipelineAppStage(this, "PROD", {
        env: { account: "902391215980", region: "us-east-1" },
      })
    );
  }
}
