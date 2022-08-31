import { Construct } from "constructs";
import { AaaaRecord, AaaaRecordProps, ARecord, ARecordProps, IHostedZone, HostedZone, HostedZoneProps, HostedZoneProviderProps, RecordTarget, HostedZoneAttributes, CnameRecord, CnameRecordProps } from "aws-cdk-lib/aws-route53";
import { ApiGateway, ApiGatewayDomain } from "aws-cdk-lib/aws-route53-targets";
import { DomainName, RestApi } from "aws-cdk-lib/aws-apigateway";
import { SUBDOMAIN, DOMAIN } from "infrastructure/config";
import { getJomicuRoute53HostZoneID } from "@infrastructure/lib/SSM";

export const getJomicuRoute53 = (context: Construct): IHostedZone => { 
    return HostedZone.fromHostedZoneAttributes(context, "HostedZone", <HostedZoneAttributes>{
        zoneName: DOMAIN,
        hostedZoneId: getJomicuRoute53HostZoneID(context)
    });
}

export const createCnameRecord = (context: Construct, zone: IHostedZone, domainName: DomainName) => {
    return new CnameRecord(context, "CnameRecord", <CnameRecordProps>{
        zone: zone,
        domainName: domainName.domainName
    });
}

export const createARecord = (context: Construct, zone: IHostedZone, domainName: DomainName): ARecord => {
    return new ARecord(context, "ARecord", <ARecordProps>{
        recordName: SUBDOMAIN,
        zone: zone,
        target: RecordTarget.fromAlias(new ApiGatewayDomain(domainName))
    });
}

export const createAaaaRecord = (context: Construct, zone: IHostedZone, domainName: DomainName): AaaaRecord => {
    return new AaaaRecord(context, "AaaaRecord", <AaaaRecordProps>{
        recordName: SUBDOMAIN,
        zone: zone,
        target: RecordTarget.fromAlias(new ApiGatewayDomain(domainName))
    });
}