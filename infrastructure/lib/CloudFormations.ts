import { Construct } from "constructs";
import { Stack, StackProps } from "aws-cdk-lib";
import { getJomicuRoute53, createARecord, createAaaaRecord } from "@infrastructure/lib/Route53";
import { getJomicuCertificate } from "@infrastructure/lib/ACM";
import { buildPokemonAPIGateway } from "@infrastructure/lib/APIGateways";
import { buildCreatePokemonsLambda } from "@infrastructure/lib/Lambdas";
import { buildPokemonsTable } from "@infrastructure/lib/Tables";

export class PokemonAPIStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const route53 = getJomicuRoute53(this);

    const certificate = getJomicuCertificate(this, route53);

    const pokemonsTable = buildPokemonsTable(this);

    const getPokemonsLambda = null;

    const createPokemonsLambda = buildCreatePokemonsLambda(this, pokemonsTable);

    const pokemonAPI = buildPokemonAPIGateway(this, route53, certificate, createPokemonsLambda);

    if (pokemonAPI.domainName) {
      //const cnameRecord = createCnameRecord(this, route53, pokemonAPI.domainName);
      const aRecord = createARecord(this, route53, pokemonAPI.domainName);
      const aaaaRecord = createAaaaRecord(this, route53, pokemonAPI.domainName);
    }

    pokemonsTable.grantWriteData(createPokemonsLambda);
  }
}
