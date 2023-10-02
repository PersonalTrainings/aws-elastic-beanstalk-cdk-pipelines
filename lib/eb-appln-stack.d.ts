import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
export interface EBEnvProps extends cdk.StackProps {
    minSize?: string;
    maxSize?: string;
    instanceTypes?: string;
    envName?: string;
}
export declare class EBApplnStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: EBEnvProps);
}
