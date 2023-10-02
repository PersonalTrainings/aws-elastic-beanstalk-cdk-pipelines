"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdkPipelineStack = void 0;
const pipelines_1 = require("aws-cdk-lib/pipelines");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const eb_stage_1 = require("./eb-stage");
/**
 * The stack that defines the application pipeline
 */
class CdkPipelineStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const pipeline = new pipelines_1.CodePipeline(this, "Pipeline", {
            // The pipeline name
            pipelineName: "MyServicePipeline",
            // How it will be built and synthesized
            synth: new pipelines_1.ShellStep("Synth", {
                // Where the source can be found
                input: pipelines_1.CodePipelineSource.gitHub("PersonalTrainings/aws-elastic-beanstalk-cdk-pipelines", "main"),
                // Install dependencies, build and run cdk synth
                installCommands: ["npm i -g npm@latest"],
                commands: ["npm ci", "npm run build", "npx cdk synth"],
            }),
        });
        // This is where we add the application stages
        // For environment with default values
        // const deploy = new CdkEBStage(this, 'Pre-Prod');
        // For environment with custom AutoScaling group configuration
        const deploy = new eb_stage_1.CdkEBStage(this, "Pre-Prod", {
            minSize: "1",
            maxSize: "1",
        });
        const deployStage = pipeline.addStage(deploy);
    }
}
exports.CdkPipelineStack = CdkPipelineStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLXBpcGVsaW5lLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrLXBpcGVsaW5lLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFEQUFvRjtBQUVwRiw2Q0FBZ0Q7QUFFaEQseUNBQXdDO0FBRXhDOztHQUVHO0FBQ0gsTUFBYSxnQkFBaUIsU0FBUSxtQkFBSztJQUN6QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQzFELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sUUFBUSxHQUFHLElBQUksd0JBQVksQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO1lBQ2xELG9CQUFvQjtZQUNwQixZQUFZLEVBQUUsbUJBQW1CO1lBRWpDLHVDQUF1QztZQUN2QyxLQUFLLEVBQUUsSUFBSSxxQkFBUyxDQUFDLE9BQU8sRUFBRTtnQkFDNUIsZ0NBQWdDO2dCQUNoQyxLQUFLLEVBQUUsOEJBQWtCLENBQUMsTUFBTSxDQUFDLHVEQUF1RCxFQUFFLE1BQU0sQ0FBQztnQkFFakcsZ0RBQWdEO2dCQUNoRCxlQUFlLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztnQkFDeEMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLGVBQWUsRUFBRSxlQUFlLENBQUM7YUFDdkQsQ0FBQztTQUNILENBQUMsQ0FBQztRQUVILDhDQUE4QztRQUM5QyxzQ0FBc0M7UUFDdEMsbURBQW1EO1FBRW5ELDhEQUE4RDtRQUM5RCxNQUFNLE1BQU0sR0FBRyxJQUFJLHFCQUFVLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTtZQUM5QyxPQUFPLEVBQUUsR0FBRztZQUNaLE9BQU8sRUFBRSxHQUFHO1NBQ2IsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoRCxDQUFDO0NBQ0Y7QUE5QkQsNENBOEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29kZVBpcGVsaW5lLCBDb2RlUGlwZWxpbmVTb3VyY2UsIFNoZWxsU3RlcCB9IGZyb20gXCJhd3MtY2RrLWxpYi9waXBlbGluZXNcIjtcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gXCJjb25zdHJ1Y3RzXCI7XG5pbXBvcnQgeyBTdGFjaywgU3RhY2tQcm9wcyB9IGZyb20gXCJhd3MtY2RrLWxpYlwiO1xuXG5pbXBvcnQgeyBDZGtFQlN0YWdlIH0gZnJvbSBcIi4vZWItc3RhZ2VcIjtcblxuLyoqXG4gKiBUaGUgc3RhY2sgdGhhdCBkZWZpbmVzIHRoZSBhcHBsaWNhdGlvbiBwaXBlbGluZVxuICovXG5leHBvcnQgY2xhc3MgQ2RrUGlwZWxpbmVTdGFjayBleHRlbmRzIFN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBTdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICBjb25zdCBwaXBlbGluZSA9IG5ldyBDb2RlUGlwZWxpbmUodGhpcywgXCJQaXBlbGluZVwiLCB7XG4gICAgICAvLyBUaGUgcGlwZWxpbmUgbmFtZVxuICAgICAgcGlwZWxpbmVOYW1lOiBcIk15U2VydmljZVBpcGVsaW5lXCIsXG5cbiAgICAgIC8vIEhvdyBpdCB3aWxsIGJlIGJ1aWx0IGFuZCBzeW50aGVzaXplZFxuICAgICAgc3ludGg6IG5ldyBTaGVsbFN0ZXAoXCJTeW50aFwiLCB7XG4gICAgICAgIC8vIFdoZXJlIHRoZSBzb3VyY2UgY2FuIGJlIGZvdW5kXG4gICAgICAgIGlucHV0OiBDb2RlUGlwZWxpbmVTb3VyY2UuZ2l0SHViKFwiUGVyc29uYWxUcmFpbmluZ3MvYXdzLWVsYXN0aWMtYmVhbnN0YWxrLWNkay1waXBlbGluZXNcIiwgXCJtYWluXCIpLFxuXG4gICAgICAgIC8vIEluc3RhbGwgZGVwZW5kZW5jaWVzLCBidWlsZCBhbmQgcnVuIGNkayBzeW50aFxuICAgICAgICBpbnN0YWxsQ29tbWFuZHM6IFtcIm5wbSBpIC1nIG5wbUBsYXRlc3RcIl0sXG4gICAgICAgIGNvbW1hbmRzOiBbXCJucG0gY2lcIiwgXCJucG0gcnVuIGJ1aWxkXCIsIFwibnB4IGNkayBzeW50aFwiXSxcbiAgICAgIH0pLFxuICAgIH0pO1xuXG4gICAgLy8gVGhpcyBpcyB3aGVyZSB3ZSBhZGQgdGhlIGFwcGxpY2F0aW9uIHN0YWdlc1xuICAgIC8vIEZvciBlbnZpcm9ubWVudCB3aXRoIGRlZmF1bHQgdmFsdWVzXG4gICAgLy8gY29uc3QgZGVwbG95ID0gbmV3IENka0VCU3RhZ2UodGhpcywgJ1ByZS1Qcm9kJyk7XG5cbiAgICAvLyBGb3IgZW52aXJvbm1lbnQgd2l0aCBjdXN0b20gQXV0b1NjYWxpbmcgZ3JvdXAgY29uZmlndXJhdGlvblxuICAgIGNvbnN0IGRlcGxveSA9IG5ldyBDZGtFQlN0YWdlKHRoaXMsIFwiUHJlLVByb2RcIiwge1xuICAgICAgbWluU2l6ZTogXCIxXCIsXG4gICAgICBtYXhTaXplOiBcIjFcIixcbiAgICB9KTtcbiAgICBjb25zdCBkZXBsb3lTdGFnZSA9IHBpcGVsaW5lLmFkZFN0YWdlKGRlcGxveSk7XG4gIH1cbn1cbiJdfQ==