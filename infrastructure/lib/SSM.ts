import { Construct } from "constructs";
import { StringParameter } from "aws-cdk-lib/aws-ssm";

import { ENVIRONMENT } from "infrastructure/config";

export const getJomicuRoute53HostZoneID = (context: Construct): string => {
    return StringParameter.valueFromLookup(context, `/${ENVIRONMENT}/route53/JOMICU_HOSTED_ZONE_ID`)
} 