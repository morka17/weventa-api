import { FastifyInstance } from "fastify";
import { createProductHandler, deleteProductHandler, getProductHandler, getVendorDigitalProductsHandler, getVendorPhysicalProductsHandler, getVendorProductsHandler, searchProductsHandler, searchProductsWithNLPHandler, updateProductHandler } from "./product.controller";
import { $ref } from "./product.schema";


export async function productRoute(server: FastifyInstance){
   
    server.post("/", 
        {preHandler:[ server.authenticate, server.guard.scope("vendor")], schema: {body: $ref("createProductSchema"), response: {201: $ref("createProductResponseSchema")}}}, 
        createProductHandler
    )


    server.delete("/:productId", 
    {preHandler: [server.authenticate, server.guard.scope("vendor")], schema: {params: $ref("productIdSchema"), response: {200: $ref("defaultResponse")}}}, 
    deleteProductHandler
    )

    // TODO: Add the body schema 
    server.put("/:productId", 
    { preHandler: [server.authenticate, server.guard.scope("vendor")], schema: {params: $ref("productIdSchema"),  response: {200: $ref("createProductResponseSchema")}}}, 
    updateProductHandler
    )

    server.get("/:productId", 
    {schema: {params: $ref("productIdSchema"), response: {200: $ref("createProductResponseSchema")}}}, 
     getProductHandler
    )

    server.get("/vendor/:vendorId", 
    {schema: {params: $ref("vendorIdSchema"), response: {200: $ref("productsSchema")}}}, 
    getVendorProductsHandler
    )

    server.get("/vendor/digital/:vendorId", 
    {schema: {params: $ref("vendorIdSchema"), response: {200: $ref("productsSchema")}}}, 
    getVendorDigitalProductsHandler
    )

    server.get("/vendor/physical/:vendorId", 
    {schema: {params: $ref("vendorIdSchema"), response: {200: $ref("productsSchema")}}}, 
    getVendorPhysicalProductsHandler
    )

    server.get("/search/", 
    {schema: {querystring: $ref("searchProductSchema"), response: {200: $ref("productsSchema")}}}, 
    searchProductsHandler
    )

    server.get("/searchWithNLP/", 
    {schema: {querystring: $ref("searchProductSchema"), response: {200: $ref("productsSchema")}}}, 
    searchProductsWithNLPHandler
    )
        



}