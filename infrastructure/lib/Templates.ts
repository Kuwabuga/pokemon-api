import { IntegrationResponse } from "aws-cdk-lib/aws-apigateway"

export const CreatePokemonsRequestTemplate = <{ [contentType: string]: string }>{
    "application/json": String.raw`
            #set($pokemons = $input.path('$.pokemons')) 
            {
                "pokemons": [
                    #foreach($pokemon in $pokemons) 
                    {   
                        "national_dex_number": "$pokemon.nationalDexNumber",
                        "name": "$pokemon.name",
                        "type": "$pokemon.type",
                        #if("$pokemon.tags" != ""),
                            "tags": $pokemon.tags
                        #end
                    }#if($foreach.hasNext),#end
                    #end
                ]
            }
        `
}

export const CreatePokemonsResponseTemplates = [
    <IntegrationResponse>{
        statusCode: "500",
        selectionPattern: ".*\"message\"\s*:\s*\"Internal Server Error\".*",
        responseTemplates: {
            "application/json": String.raw`
                {
                    "message": "Internal Server Error"
                }
            `
        }
    },
    <IntegrationResponse>{
        statusCode: "201",
        selectionPattern: "",
        // responseTemplates: {
        //     "application/json": String.raw`
        //         #set($products = $input.path('$.products')) 
        //         {
        //             "products": [
        //                 #foreach($product in $products) 
        //                 {
        //                     "id": "$product.id",
        //                     "name": "$product.name",
        //                     "type": "$product.type",
        //                     "unit": "$product.unit",
        //                     "brand": "$product.brand",
        //                     #if("$product.description" == "")
        //                         "description": null,
        //                     #else
        //                         "description": "$product.description",
        //                     #end
        //                     "tags": $product.tags
        //                 }#if($foreach.hasNext),#end
        //                 #end
        //             ]
        //         }
        //     `
        // }
    }
]