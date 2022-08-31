import { Construct } from "constructs";
import { IHostedZone } from "aws-cdk-lib/aws-route53";
import { Certificate, CertificateValidation } from "aws-cdk-lib/aws-certificatemanager";
import { CERTIFICATE_DOMAIN_NAME } from "infrastructure/config";

export const getJomicuCertificate = (context: Construct, hostedZone: IHostedZone): Certificate => {
  return new Certificate(context, "Certificate", {
    domainName: CERTIFICATE_DOMAIN_NAME,
    validation: CertificateValidation.fromDns(hostedZone),
  });
}