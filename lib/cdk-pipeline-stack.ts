import { CodePipeline, CodePipelineSource, ShellStep } from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { Stack, StackProps } from "aws-cdk-lib";

import { CdkEBStage } from "./eb-stage";
import { BuildSpec } from "aws-cdk-lib/aws-codebuild";

/**
 * The stack that defines the application pipeline
 */
export class CdkPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, "Pipeline", {
      // The pipeline name
      pipelineName: "MyServicePipeline",

      // How it will be built and synthesized
      synth: new ShellStep("Synth", {
        // Where the source can be found
        input: CodePipelineSource.gitHub("PersonalTrainings/aws-elastic-beanstalk-cdk-pipelines", "main"),

        // Install dependencies, build and run cdk synth
        installCommands: ["npm i -g npm@9"],
        commands: ["npm ci", "npm run build", "npx cdk synth"],
      }),
      synthCodeBuildDefaults: {
        partialBuildSpec: BuildSpec.fromObject({
          phases: {
            install: {
              "runtime-versions": {
                nodejs: "16",
              },
            },
          },
        }),
      },
    });

    // This is where we add the application stages
    // For environment with default values
    // const deploy = new CdkEBStage(this, 'Pre-Prod');

    // For environment with custom AutoScaling group configuration
    const deploy = new CdkEBStage(this, "Pre-Prod", {
      minSize: "1",
      maxSize: "1",
    });
    const deployStage = pipeline.addStage(deploy);
  }
}
