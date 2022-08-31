import { join } from "path";
import { Construct } from "constructs";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { Function, Runtime, Architecture, Code, FunctionProps } from "aws-cdk-lib/aws-lambda";
import { ENVIRONMENT, SERVICE } from "infrastructure/config";

export const buildCreatePokemonsLambda = (context: Construct, pokemonsTable: Table): Function => {
    return new Function(context, `${ENVIRONMENT}-${SERVICE}-create-pokemons`, <FunctionProps>{
        functionName: `${ENVIRONMENT}-${SERVICE}-create-pokemons`,
        runtime: Runtime.PYTHON_3_9,
        architecture: Architecture.X86_64,
        code: Code.fromAsset(join(__dirname, "../../application")),
        handler: "create_pokemons.handle_event",
        environment: {
            STAGE: ENVIRONMENT,
            POKEMONS_TABLE_NAME: pokemonsTable.tableName
        }
    });
}