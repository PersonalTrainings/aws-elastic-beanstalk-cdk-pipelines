"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdkEBStage = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const eb_appln_stack_1 = require("./eb-appln-stack");
/**
 * Deployable unit of web service app
 */
class CdkEBStage extends aws_cdk_lib_1.Stage {
    constructor(scope, id, props) {
        super(scope, id, props);
        const service = new eb_appln_stack_1.EBApplnStack(this, 'WebService', {
            minSize: props?.minSize,
            maxSize: props?.maxSize,
            instanceTypes: props?.instanceTypes,
            envName: props?.envName
        });
    }
}
exports.CdkEBStage = CdkEBStage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWItc3RhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlYi1zdGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBb0M7QUFFcEMscURBQTREO0FBRTVEOztHQUVHO0FBQ0gsTUFBYSxVQUFXLFNBQVEsbUJBQUs7SUFFbkMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFrQjtRQUMxRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLE9BQU8sR0FBRyxJQUFJLDZCQUFZLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUNuRCxPQUFPLEVBQUcsS0FBSyxFQUFFLE9BQU87WUFDeEIsT0FBTyxFQUFHLEtBQUssRUFBRSxPQUFPO1lBQ3hCLGFBQWEsRUFBRyxLQUFLLEVBQUUsYUFBYTtZQUNwQyxPQUFPLEVBQUcsS0FBSyxFQUFFLE9BQU87U0FDM0IsQ0FBRSxDQUFDO0lBRUosQ0FBQztDQUNGO0FBYkQsZ0NBYUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdGFnZSB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0IHsgRUJFbnZQcm9wcywgRUJBcHBsblN0YWNrIH0gZnJvbSAnLi9lYi1hcHBsbi1zdGFjayc7XG5cbi8qKlxuICogRGVwbG95YWJsZSB1bml0IG9mIHdlYiBzZXJ2aWNlIGFwcFxuICovXG5leHBvcnQgY2xhc3MgQ2RrRUJTdGFnZSBleHRlbmRzIFN0YWdlIHtcbiAgICAgIFxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IEVCRW52UHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIGNvbnN0IHNlcnZpY2UgPSBuZXcgRUJBcHBsblN0YWNrKHRoaXMsICdXZWJTZXJ2aWNlJywge1xuICAgICAgbWluU2l6ZSA6IHByb3BzPy5taW5TaXplLCBcbiAgICAgIG1heFNpemUgOiBwcm9wcz8ubWF4U2l6ZSxcbiAgICAgIGluc3RhbmNlVHlwZXMgOiBwcm9wcz8uaW5zdGFuY2VUeXBlcyxcbiAgICAgIGVudk5hbWUgOiBwcm9wcz8uZW52TmFtZVxuICB9ICk7XG4gICAgXG4gIH1cbn0iXX0=