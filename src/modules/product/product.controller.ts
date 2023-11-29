import { FastifyReply, FastifyRequest } from "fastify";
import { CreateProductInput, ProductIdInput, VendorIdInput, searchProductInput } from "./product.schema";
import { createProduct, deleteProductById, findProduct, searchProduct, searchProductsWithNLP, updateProduct } from "./product.service";
import { User } from "../../utils/user.util";



export async function createProductHandler(request: FastifyRequest<{
    Body: CreateProductInput
}>, reply: FastifyReply){

    const product = request.body

    const user =  request.user as User

    try{
        const product = await createProduct({...request.body, ownerId:  user.id})
        return reply.code(201).send(product)
    }catch(e){
        console.log(e)
        return reply.code(500).send(e)
    }

}


export async function deleteProductHandler(request: FastifyRequest<{
    Params: ProductIdInput
}>, reply: FastifyReply){

    const params = request.params
    if (!params.productId){
        return reply.code(403).send({error: true, msg:"Product id is required"})
    }



    try{
        const found = await findProduct({id: params.productId})
        if (!found){
            return reply.code(404).send({error: true, msg:"Product does not exist"})
        }

        // Owner iD
        const ownerId = found[0].ownerId;

        // Current user 
        const user = request.user as User

        // check if product belongs to current User 
        if (user.id !== ownerId){
            return  reply.code(401).send({error: true, msg:"Unauthorized"})
        }


        const product = await  deleteProductById(params.productId)
        if (product){
            reply.code(200).send({error: false, msg:"Product deleted successfully"})
        }
    }catch(e){
        reply.code(500).send({error: true, msg:e})
    }




}

export async function updateProductHandler(request: FastifyRequest<{
    Params:ProductIdInput 
    Body: Object
}>, reply: FastifyReply){

    const params = request.params
    const body = request.body 

    if (!params.productId){
        return reply.code(403).send({error: true, msg:"Product id is required"})
    }

    try {
        const found = await findProduct({id: params.productId})
        if (!found){
            return reply.code(404).send({error: true, msg:"Product does not exist"})
        }

        // Product owner 
        const ownerId = found[0].ownerId

        // current use 
        const user = request.user as User 

        // check if product belong to current user 
        if (user.id !== ownerId){
            return reply.code(401).send({error: true, msg: "Unauthorized"})
        }
        const product = await updateProduct({id: params.productId}, body)
        return product
    }catch(e){
        return reply.code(500).send({error: true, msg:e})
    }

}
export async function getProductHandler(request: FastifyRequest<{
    Params: ProductIdInput 
}>, reply: FastifyReply){

    const params = request.params
    if (!params.productId){
        return reply.code(403).send({error: true, msg: "id is required"})
    }

    try{
        const products = await findProduct({id: Number(params.productId)})
        if (products.length <= 0) return reply.code(404).send({error: true, msg: "Product not found"})
        return reply.code(200).send(products[0])
    }catch(e){
        return reply.code(500).send({error: true, msg: e})
    }
}


export async function getVendorProductsHandler(request: FastifyRequest<{
    Params: VendorIdInput 
    Body: Object
}>, reply: FastifyReply){

    const params = request.params
    if (!params.vendorId){
        return reply.code(403).send({error: true, msg:"Vendor id is required"})
    }

    try{
        const products = await findProduct({ownerId: params.vendorId})
        return reply.code(200).send(products)
    }catch(e){
        return reply.code(500).send({error: true, msg: e})
    }
}

export async function getVendorDigitalProductsHandler(request: FastifyRequest<{
    Params: VendorIdInput 
    Body: Object
}>, reply: FastifyReply){

    const params = request.params
    if (!params.vendorId){
        return reply.code(403).send({error: true, msg:"Vendor id is required"})
    }

    try{
        const products = await findProduct({ownerId: params.vendorId, productType: "digital"})
        return reply.code(200).send(products)
    }catch(e){
        return reply.code(500).send({error: true, msg: e})
    }
}


export async function getVendorPhysicalProductsHandler(request: FastifyRequest<{
    Params: VendorIdInput 
    Body: Object
}>, reply: FastifyReply){

    const params = request.params
    if (!params.vendorId){
        return reply.code(403).send({error: true, msg:"Vendor id is required"})
    }

    try{
        const products = await findProduct({ownerId: params.vendorId, productType: "physical"})
        return reply.code(200).send(products)
    }catch(e){
        return reply.code(500).send({error: true, msg: e})
    }
}


export async function searchProductsHandler(request: FastifyRequest<{
    Querystring: searchProductInput 
    
}>, reply: FastifyReply){
    const query = request.query
    
    try{
        const products = await searchProduct(query.queryString)
        return products
    }catch(e){
        return reply.code(500).send({error: true, msg: e})
    }
    
}



export async function searchProductsWithNLPHandler(request: FastifyRequest<{
    Querystring: searchProductInput 
    
}>, reply: FastifyReply){
    const query = request.query
    
    try{
        const products = await searchProductsWithNLP(query.queryString)
        return products
    }catch(e){
        return reply.code(500).send({error: true, msg: e})
    }
    
}

export async function getProducts(request: FastifyRequest<{
    Querystring: searchProductInput 
    
}>, reply: FastifyReply){

    try{
        const products = await findProduct({})
        return products
    }catch(e){
        return  reply.code(500).send({error: true, msg: e})
    }
}