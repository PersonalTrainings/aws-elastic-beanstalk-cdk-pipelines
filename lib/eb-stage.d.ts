import { Stage } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { EBEnvProps } from './eb-appln-stack';
/**
 * Deployable unit of web service app
 */
export declare class CdkEBStage extends Stage {
    constructor(scope: Construct, id: string, props?: EBEnvProps);
}
