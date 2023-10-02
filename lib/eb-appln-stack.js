"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EBApplnStack = void 0;
const cdk = require("aws-cdk-lib");
// Add import statements here
const s3assets = require("aws-cdk-lib/aws-s3-assets");
const elasticbeanstalk = require("aws-cdk-lib/aws-elasticbeanstalk");
const iam = require("aws-cdk-lib/aws-iam");
class EBApplnStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // The code that defines your stack goes here
        // Construct an S3 asset Zip from directory up.
        const webAppZipArchive = new s3assets.Asset(this, 'WebAppZip', {
            path: `${__dirname}/../src`,
        });
        // Create a ElasticBeanStalk app.
        const appName = 'MyWebApp';
        const app = new elasticbeanstalk.CfnApplication(this, 'Application', {
            applicationName: appName,
        });
        // Create an app version from the S3 asset defined earlier
        const appVersionProps = new elasticbeanstalk.CfnApplicationVersion(this, 'AppVersion', {
            applicationName: appName,
            sourceBundle: {
                s3Bucket: webAppZipArchive.s3BucketName,
                s3Key: webAppZipArchive.s3ObjectKey,
            },
        });
        // Make sure that Elastic Beanstalk app exists before creating an app version
        appVersionProps.addDependency(app);
        // Create role and instance profile
        const myRole = new iam.Role(this, `${appName}-aws-elasticbeanstalk-ec2-role`, {
            assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
        });
        const managedPolicy = iam.ManagedPolicy.fromAwsManagedPolicyName('AWSElasticBeanstalkWebTier');
        myRole.addManagedPolicy(managedPolicy);
        const myProfileName = `${appName}-InstanceProfile`;
        const instanceProfile = new iam.CfnInstanceProfile(this, myProfileName, {
            instanceProfileName: myProfileName,
            roles: [
                myRole.roleName
            ]
        });
        // Example of some options which can be configured
        const optionSettingProperties = [
            {
                namespace: 'aws:autoscaling:launchconfiguration',
                optionName: 'IamInstanceProfile',
                value: myProfileName,
            },
            {
                namespace: 'aws:autoscaling:asg',
                optionName: 'MinSize',
                value: props?.maxSize ?? '1',
            },
            {
                namespace: 'aws:autoscaling:asg',
                optionName: 'MaxSize',
                value: props?.maxSize ?? '1',
            },
            {
                namespace: 'aws:ec2:instances',
                optionName: 'InstanceTypes',
                value: props?.instanceTypes ?? 't2.micro',
            },
        ];
        // Create an Elastic Beanstalk environment to run the application
        const elbEnv = new elasticbeanstalk.CfnEnvironment(this, 'Environment', {
            environmentName: props?.envName ?? "MyWebAppEnvironment",
            applicationName: app.applicationName || appName,
            solutionStackName: '64bit Amazon Linux 2 v5.8.0 running Node.js 18',
            optionSettings: optionSettingProperties,
            versionLabel: appVersionProps.ref,
        });
    }
}
exports.EBApplnStack = EBApplnStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWItYXBwbG4tc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlYi1hcHBsbi1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBbUM7QUFFbkMsNkJBQTZCO0FBQzdCLHNEQUFzRDtBQUN0RCxxRUFBcUU7QUFDckUsMkNBQTJDO0FBVTNDLE1BQWEsWUFBYSxTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQ3pDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7UUFDMUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsNkNBQTZDO1FBRWpELCtDQUErQztRQUMvQyxNQUFNLGdCQUFnQixHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFO1lBQ3pELElBQUksRUFBRSxHQUFHLFNBQVMsU0FBUztTQUNoQyxDQUFDLENBQUM7UUFFSCxpQ0FBaUM7UUFDakMsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDO1FBQzNCLE1BQU0sR0FBRyxHQUFHLElBQUksZ0JBQWdCLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUU7WUFDakUsZUFBZSxFQUFFLE9BQU87U0FDM0IsQ0FBQyxDQUFDO1FBRUgsMERBQTBEO1FBQzFELE1BQU0sZUFBZSxHQUFHLElBQUksZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUNuRixlQUFlLEVBQUUsT0FBTztZQUN4QixZQUFZLEVBQUU7Z0JBQ1YsUUFBUSxFQUFFLGdCQUFnQixDQUFDLFlBQVk7Z0JBQ3ZDLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXO2FBQ3RDO1NBQ0osQ0FBQyxDQUFDO1FBRUgsNkVBQTZFO1FBQzdFLGVBQWUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFbkMsbUNBQW1DO1FBQ25DLE1BQU0sTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxPQUFPLGdDQUFnQyxFQUFFO1lBQzFFLFNBQVMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQztTQUMzRCxDQUFDLENBQUM7UUFFSCxNQUFNLGFBQWEsR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDLDRCQUE0QixDQUFDLENBQUE7UUFDOUYsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRXZDLE1BQU0sYUFBYSxHQUFHLEdBQUcsT0FBTyxrQkFBa0IsQ0FBQTtRQUVsRCxNQUFNLGVBQWUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFO1lBQ3BFLG1CQUFtQixFQUFFLGFBQWE7WUFDbEMsS0FBSyxFQUFFO2dCQUNILE1BQU0sQ0FBQyxRQUFRO2FBQ2xCO1NBQ0osQ0FBQyxDQUFDO1FBRUgsa0RBQWtEO1FBQ2xELE1BQU0sdUJBQXVCLEdBQTREO1lBQ3JGO2dCQUNJLFNBQVMsRUFBRSxxQ0FBcUM7Z0JBQ2hELFVBQVUsRUFBRSxvQkFBb0I7Z0JBQ2hDLEtBQUssRUFBRSxhQUFhO2FBQ3ZCO1lBQ0Q7Z0JBQ0ksU0FBUyxFQUFFLHFCQUFxQjtnQkFDaEMsVUFBVSxFQUFFLFNBQVM7Z0JBQ3JCLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxJQUFJLEdBQUc7YUFDL0I7WUFDRDtnQkFDSSxTQUFTLEVBQUUscUJBQXFCO2dCQUNoQyxVQUFVLEVBQUUsU0FBUztnQkFDckIsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLElBQUksR0FBRzthQUMvQjtZQUNEO2dCQUNJLFNBQVMsRUFBRSxtQkFBbUI7Z0JBQzlCLFVBQVUsRUFBRSxlQUFlO2dCQUMzQixLQUFLLEVBQUUsS0FBSyxFQUFFLGFBQWEsSUFBSSxVQUFVO2FBQzVDO1NBQ0osQ0FBQztRQUdGLGlFQUFpRTtRQUNqRSxNQUFNLE1BQU0sR0FBRyxJQUFJLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFO1lBQ3BFLGVBQWUsRUFBRSxLQUFLLEVBQUUsT0FBTyxJQUFJLHFCQUFxQjtZQUN4RCxlQUFlLEVBQUUsR0FBRyxDQUFDLGVBQWUsSUFBSSxPQUFPO1lBQy9DLGlCQUFpQixFQUFFLGdEQUFnRDtZQUNuRSxjQUFjLEVBQUUsdUJBQXVCO1lBQ3ZDLFlBQVksRUFBRSxlQUFlLENBQUMsR0FBRztTQUNwQyxDQUFDLENBQUM7SUFHRCxDQUFDO0NBQ0Y7QUFsRkQsb0NBa0ZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuLy8gQWRkIGltcG9ydCBzdGF0ZW1lbnRzIGhlcmVcbmltcG9ydCAqIGFzIHMzYXNzZXRzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1zMy1hc3NldHMnO1xuaW1wb3J0ICogYXMgZWxhc3RpY2JlYW5zdGFsayBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZWxhc3RpY2JlYW5zdGFsayc7XG5pbXBvcnQgKiBhcyBpYW0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWlhbSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRUJFbnZQcm9wcyBleHRlbmRzIGNkay5TdGFja1Byb3BzIHtcbiAgICAvLyBBdXRvc2NhbGluZyBncm91cCBjb25maWd1cmF0aW9uXG4gIG1pblNpemU/OiBzdHJpbmc7XG4gIG1heFNpemU/OiBzdHJpbmc7XG4gIGluc3RhbmNlVHlwZXM/OiBzdHJpbmc7XG4gIGVudk5hbWU/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBFQkFwcGxuU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IEVCRW52UHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIC8vIFRoZSBjb2RlIHRoYXQgZGVmaW5lcyB5b3VyIHN0YWNrIGdvZXMgaGVyZVxuXG4vLyBDb25zdHJ1Y3QgYW4gUzMgYXNzZXQgWmlwIGZyb20gZGlyZWN0b3J5IHVwLlxuY29uc3Qgd2ViQXBwWmlwQXJjaGl2ZSA9IG5ldyBzM2Fzc2V0cy5Bc3NldCh0aGlzLCAnV2ViQXBwWmlwJywge1xuICAgICAgcGF0aDogYCR7X19kaXJuYW1lfS8uLi9zcmNgLFxufSk7XG5cbi8vIENyZWF0ZSBhIEVsYXN0aWNCZWFuU3RhbGsgYXBwLlxuY29uc3QgYXBwTmFtZSA9ICdNeVdlYkFwcCc7XG5jb25zdCBhcHAgPSBuZXcgZWxhc3RpY2JlYW5zdGFsay5DZm5BcHBsaWNhdGlvbih0aGlzLCAnQXBwbGljYXRpb24nLCB7XG4gICAgYXBwbGljYXRpb25OYW1lOiBhcHBOYW1lLFxufSk7XG5cbi8vIENyZWF0ZSBhbiBhcHAgdmVyc2lvbiBmcm9tIHRoZSBTMyBhc3NldCBkZWZpbmVkIGVhcmxpZXJcbmNvbnN0IGFwcFZlcnNpb25Qcm9wcyA9IG5ldyBlbGFzdGljYmVhbnN0YWxrLkNmbkFwcGxpY2F0aW9uVmVyc2lvbih0aGlzLCAnQXBwVmVyc2lvbicsIHtcbiAgICBhcHBsaWNhdGlvbk5hbWU6IGFwcE5hbWUsXG4gICAgc291cmNlQnVuZGxlOiB7XG4gICAgICAgIHMzQnVja2V0OiB3ZWJBcHBaaXBBcmNoaXZlLnMzQnVja2V0TmFtZSxcbiAgICAgICAgczNLZXk6IHdlYkFwcFppcEFyY2hpdmUuczNPYmplY3RLZXksXG4gICAgfSxcbn0pO1xuXG4vLyBNYWtlIHN1cmUgdGhhdCBFbGFzdGljIEJlYW5zdGFsayBhcHAgZXhpc3RzIGJlZm9yZSBjcmVhdGluZyBhbiBhcHAgdmVyc2lvblxuYXBwVmVyc2lvblByb3BzLmFkZERlcGVuZGVuY3koYXBwKTtcblxuLy8gQ3JlYXRlIHJvbGUgYW5kIGluc3RhbmNlIHByb2ZpbGVcbmNvbnN0IG15Um9sZSA9IG5ldyBpYW0uUm9sZSh0aGlzLCBgJHthcHBOYW1lfS1hd3MtZWxhc3RpY2JlYW5zdGFsay1lYzItcm9sZWAsIHtcbiAgICBhc3N1bWVkQnk6IG5ldyBpYW0uU2VydmljZVByaW5jaXBhbCgnZWMyLmFtYXpvbmF3cy5jb20nKSxcbn0pO1xuXG5jb25zdCBtYW5hZ2VkUG9saWN5ID0gaWFtLk1hbmFnZWRQb2xpY3kuZnJvbUF3c01hbmFnZWRQb2xpY3lOYW1lKCdBV1NFbGFzdGljQmVhbnN0YWxrV2ViVGllcicpXG5teVJvbGUuYWRkTWFuYWdlZFBvbGljeShtYW5hZ2VkUG9saWN5KTtcblxuY29uc3QgbXlQcm9maWxlTmFtZSA9IGAke2FwcE5hbWV9LUluc3RhbmNlUHJvZmlsZWBcblxuY29uc3QgaW5zdGFuY2VQcm9maWxlID0gbmV3IGlhbS5DZm5JbnN0YW5jZVByb2ZpbGUodGhpcywgbXlQcm9maWxlTmFtZSwge1xuICAgIGluc3RhbmNlUHJvZmlsZU5hbWU6IG15UHJvZmlsZU5hbWUsXG4gICAgcm9sZXM6IFtcbiAgICAgICAgbXlSb2xlLnJvbGVOYW1lXG4gICAgXVxufSk7XG5cbi8vIEV4YW1wbGUgb2Ygc29tZSBvcHRpb25zIHdoaWNoIGNhbiBiZSBjb25maWd1cmVkXG5jb25zdCBvcHRpb25TZXR0aW5nUHJvcGVydGllczogZWxhc3RpY2JlYW5zdGFsay5DZm5FbnZpcm9ubWVudC5PcHRpb25TZXR0aW5nUHJvcGVydHlbXSA9IFtcbiAgICB7XG4gICAgICAgIG5hbWVzcGFjZTogJ2F3czphdXRvc2NhbGluZzpsYXVuY2hjb25maWd1cmF0aW9uJyxcbiAgICAgICAgb3B0aW9uTmFtZTogJ0lhbUluc3RhbmNlUHJvZmlsZScsXG4gICAgICAgIHZhbHVlOiBteVByb2ZpbGVOYW1lLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lc3BhY2U6ICdhd3M6YXV0b3NjYWxpbmc6YXNnJyxcbiAgICAgICAgb3B0aW9uTmFtZTogJ01pblNpemUnLFxuICAgICAgICB2YWx1ZTogcHJvcHM/Lm1heFNpemUgPz8gJzEnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lc3BhY2U6ICdhd3M6YXV0b3NjYWxpbmc6YXNnJyxcbiAgICAgICAgb3B0aW9uTmFtZTogJ01heFNpemUnLFxuICAgICAgICB2YWx1ZTogcHJvcHM/Lm1heFNpemUgPz8gJzEnLFxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lc3BhY2U6ICdhd3M6ZWMyOmluc3RhbmNlcycsXG4gICAgICAgIG9wdGlvbk5hbWU6ICdJbnN0YW5jZVR5cGVzJyxcbiAgICAgICAgdmFsdWU6IHByb3BzPy5pbnN0YW5jZVR5cGVzID8/ICd0Mi5taWNybycsXG4gICAgfSxcbl07XG5cblxuLy8gQ3JlYXRlIGFuIEVsYXN0aWMgQmVhbnN0YWxrIGVudmlyb25tZW50IHRvIHJ1biB0aGUgYXBwbGljYXRpb25cbmNvbnN0IGVsYkVudiA9IG5ldyBlbGFzdGljYmVhbnN0YWxrLkNmbkVudmlyb25tZW50KHRoaXMsICdFbnZpcm9ubWVudCcsIHtcbiAgICBlbnZpcm9ubWVudE5hbWU6IHByb3BzPy5lbnZOYW1lID8/IFwiTXlXZWJBcHBFbnZpcm9ubWVudFwiLFxuICAgIGFwcGxpY2F0aW9uTmFtZTogYXBwLmFwcGxpY2F0aW9uTmFtZSB8fCBhcHBOYW1lLFxuICAgIHNvbHV0aW9uU3RhY2tOYW1lOiAnNjRiaXQgQW1hem9uIExpbnV4IDIgdjUuOC4wIHJ1bm5pbmcgTm9kZS5qcyAxOCcsXG4gICAgb3B0aW9uU2V0dGluZ3M6IG9wdGlvblNldHRpbmdQcm9wZXJ0aWVzLFxuICAgIHZlcnNpb25MYWJlbDogYXBwVmVyc2lvblByb3BzLnJlZixcbn0pO1xuXG5cbiAgfVxufSJdfQ==