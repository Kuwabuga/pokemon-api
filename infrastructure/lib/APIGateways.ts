import { Construct } from "constructs";
import { Function } from "aws-cdk-lib/aws-lambda";
import { IHostedZone } from "aws-cdk-lib/aws-route53";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import { RestApi, RestApiProps, DomainNameOptions, LambdaIntegration, ApiKeySourceType, LambdaIntegrationOptions, MethodOptions, EndpointType, EndpointConfiguration, ModelOptions, PassthroughBehavior, ApiKeyOptions, ApiKey, ApiKeyProps, UsagePlan, UsagePlanProps, CorsOptions, ThrottleSettings, UsagePlanPerApiStage, Model, ModelProps, RequestValidator, RequestValidatorProps } from "aws-cdk-lib/aws-apigateway";
import { CreatePokemonsRequestModel } from "@infrastructure/lib/JsonSchemas";
import { CreatePokemonsRequestTemplate, CreatePokemonsResponseTemplates } from "@infrastructure/lib/Templates";

import { ENVIRONMENT, SERVICE, SUBDOMAIN, BASE_PATH } from "infrastructure/config";

const integrateCreatePokemonsLambda = (pokemonAPI: RestApi, createPokemonsLambda: Function): void => {
    const createPokemonsResource = pokemonAPI.root.addResource("create-pokemons");

    const createPokemonsLambdaIntegration = new LambdaIntegration(createPokemonsLambda, <LambdaIntegrationOptions>{
        proxy: false,
        allowTestInvoke: true,
        passthroughBehavior: PassthroughBehavior.NEVER,
        requestTemplates: CreatePokemonsRequestTemplate,
        integrationResponses: CreatePokemonsResponseTemplates
    });

    createPokemonsResource.addMethod("POST", createPokemonsLambdaIntegration, <MethodOptions>{
        apiKeyRequired: true,
        requestValidator: pokemonAPI.addRequestValidator("CreatePokemonsRequestValidator", <RequestValidatorProps>{
            restApi: pokemonAPI,
            validateRequestBody: true,
        }),
        requestModels: {
            "application/json": pokemonAPI.addModel("CreatePokemonsModel", <ModelProps>{
                contentType: "application/json",
                description: "Create pokemons request JSON schema",
                modelName: "CreatePokemonsRequestModel",
                schema: CreatePokemonsRequestModel
            })
        }
    }); 

}

export const buildPokemonAPIGateway = (
    context: Construct,
    hostedZone: IHostedZone,
    certificate: Certificate,
    createPokemonsLambda: Function
): RestApi => {
    const pokemonAPI = new RestApi(context, `${ENVIRONMENT}-${SERVICE}`, <RestApiProps>{
        restApiName: `${ENVIRONMENT}-${SERVICE}`,
        description: "Pokémon pokemonAPI",
        disableExecuteApiEndpoint: true,
        deployOptions: {
            stageName: ENVIRONMENT,
        },
        domainName: <DomainNameOptions>{
          domainName: `${SUBDOMAIN}.${hostedZone.zoneName}`,
          certificate: certificate,
          basePath: BASE_PATH
        },
        endpointConfiguration: <EndpointConfiguration>{
            types: [EndpointType.REGIONAL]
        },
        apiKeySourceType: ApiKeySourceType.HEADER,
        defaultCorsPreflightOptions: <CorsOptions>{
            allowHeaders: [
              "Content-Type",
              "X-Amz-Date",
              "Authorization",
              "X-Api-Key",
            ],
            allowMethods: ["GET","POST"],
            allowOrigins: ["*"]
        }
    });

    const usagePlan = pokemonAPI.addUsagePlan(`${ENVIRONMENT}-${SERVICE}-default-usage-plan`, <UsagePlanProps>{
        name: `${ENVIRONMENT}-${SERVICE}-default-usage-plan`,
        apiStages: [
            <UsagePlanPerApiStage>{
                api: pokemonAPI,
                stage: pokemonAPI.deploymentStage
            }
        ]
    });
      
    const key = pokemonAPI.addApiKey(`${ENVIRONMENT}-${SERVICE}-default-api-key`, <ApiKeyOptions>{
        apiKeyName: `${ENVIRONMENT}-${SERVICE}-default-api-key`
    });
    
    usagePlan.addApiKey(key);

    integrateCreatePokemonsLambda(pokemonAPI, createPokemonsLambda);

    return pokemonAPI;
}