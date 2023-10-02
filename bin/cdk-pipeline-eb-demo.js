#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const cdk = require("aws-cdk-lib");
const cdk_pipeline_stack_1 = require("../lib/cdk-pipeline-stack");
const app = new cdk.App();
new cdk_pipeline_stack_1.CdkPipelineStack(app, "CdkPipelineStack", {
    env: { account: "941039322379", region: "us-east-1" },
});
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLXBpcGVsaW5lLWViLWRlbW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjZGstcGlwZWxpbmUtZWItZGVtby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx1Q0FBcUM7QUFDckMsbUNBQW1DO0FBQ25DLGtFQUE2RDtBQUU3RCxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUMxQixJQUFJLHFDQUFnQixDQUFDLEdBQUcsRUFBRSxrQkFBa0IsRUFBRTtJQUM1QyxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUU7Q0FDdEQsQ0FBQyxDQUFDO0FBQ0gsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuaW1wb3J0IFwic291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyXCI7XG5pbXBvcnQgKiBhcyBjZGsgZnJvbSBcImF3cy1jZGstbGliXCI7XG5pbXBvcnQgeyBDZGtQaXBlbGluZVN0YWNrIH0gZnJvbSBcIi4uL2xpYi9jZGstcGlwZWxpbmUtc3RhY2tcIjtcblxuY29uc3QgYXBwID0gbmV3IGNkay5BcHAoKTtcbm5ldyBDZGtQaXBlbGluZVN0YWNrKGFwcCwgXCJDZGtQaXBlbGluZVN0YWNrXCIsIHtcbiAgZW52OiB7IGFjY291bnQ6IFwiOTQxMDM5MzIyMzc5XCIsIHJlZ2lvbjogXCJ1cy1lYXN0LTFcIiB9LFxufSk7XG5hcHAuc3ludGgoKTtcbiJdfQ==