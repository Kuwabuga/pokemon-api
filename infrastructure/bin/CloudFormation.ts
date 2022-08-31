import "source-map-support/register";
import { App, StackProps } from "aws-cdk-lib";
import { PokemonAPIStack } from "@infrastructure/lib/CloudFormations";
import { ENVIRONMENT, SERVICE } from "infrastructure/config";

const app = new App();

new PokemonAPIStack(app, `${ENVIRONMENT}-${SERVICE}-stack`, <StackProps>{
  stackName: `${ENVIRONMENT}-${SERVICE}-stack`,
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION }
});