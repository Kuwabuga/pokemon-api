import { JsonSchema, JsonSchemaVersion, JsonSchemaType } from "aws-cdk-lib/aws-apigateway";

export const CreatePokemonRequestModel = <JsonSchema>{
    schema: JsonSchemaVersion.DRAFT4,
    title: "CreatePokemonsRequestModel",
    type: JsonSchemaType.OBJECT,
    required: ["nationalDexNumber", "Name"],
    additionalProperties: false,
    properties: {
        nationalDexNumber: <JsonSchema>{
            type: JsonSchemaType.NUMBER,
            minimum: 1,
            maximum: 905
        },
        name: <JsonSchema>{
            type: JsonSchemaType.STRING,
            minLength: 1,
            maxLength: 50
        },
        gender: <JsonSchema>{
            type: JsonSchemaType.STRING,
            enum: ["Male","Female","Unknown"]
        },
        type: <JsonSchema>{
            type: JsonSchemaType.ARRAY,
            uniqueItems: true,
            minLength: 1,
            maxLength: 2,
            items: <JsonSchema>{
                type: JsonSchemaType.STRING,
                enum: [
                    "Grass",
                    "Fire",
                    "Water"
                ]
            }
        },
        tags: <JsonSchema>{
            type: JsonSchemaType.ARRAY,
            uniqueItems: true,
            minItems: 0,
            maxItems: 5,
            items: <JsonSchema>{
                type: "string",
                minLength: 1,
                maxLength: 10
            }
        }
    }
}

export const CreatePokemonsRequestModel = <JsonSchema>{
    schema: JsonSchemaVersion.DRAFT4,
    title: "CreatePokemonsRequestModel",
    type: JsonSchemaType.OBJECT,
    required: ["pokemons"],
    additionalProperties: false,
    properties: <JsonSchema>{
        pokemons: <JsonSchema>{
            title: "The pokemons array holding the pokemons to be created",
            type: JsonSchemaType.ARRAY,
            uniqueItems: true,
            minItems: 1,
            items: CreatePokemonRequestModel
        }
    }
}