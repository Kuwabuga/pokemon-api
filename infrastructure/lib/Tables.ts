import { Construct } from "constructs";
import { Table, TableProps, BillingMode, AttributeType, Attribute } from "aws-cdk-lib/aws-dynamodb";
import { ENVIRONMENT } from "infrastructure/config";

export const buildPokemonsTable = (context: Construct): Table => {
    return new Table(context, `${ENVIRONMENT}-pokemons-table`, <TableProps>{
        tableName: `${ENVIRONMENT}-pokemons-table`,
        billingMode: BillingMode.PAY_PER_REQUEST,
        partitionKey: <Attribute>{ name: "NationalDexNumber", type: AttributeType.STRING }
    });
}

// export const buildMovesTable = (context: Construct): Table => {
//     return new Table(context, `${ENVIRONMENT}-moves-table`, <TableProps>{
//         tableName: `${ENVIRONMENT}-moves-table`,
//         billingMode: BillingMode.PAY_PER_REQUEST,
//         partitionKey: <Attribute>{ name: "id", type: AttributeType.STRING }
//     });
// }