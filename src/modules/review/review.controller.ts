import { FastifyReply, FastifyRequest } from "fastify";
import { CreateReviewInput, ReviewIdInput } from "./review.schema";
import { User } from "src/utils/user.util";
import { createReview, deleteReviewById, findOneReview, findReview, updateReview } from "./review.service";
import { UpdateInput } from "../user/user.schema";
import { ProductIdInput } from "../product/product.schema";




export async function createReviewHandler(request: FastifyRequest<{
    Body: CreateReviewInput
}>, reply: FastifyReply){

    const user = request.user as User

    try{
        const review = await createReview({...request.body, userId: user.id})
        return reply.code(201).send(review)
    }catch(e){
        console.log(e)
        return reply.code(500).send(e)
    }
}




export async function updateReviewHandler(request: FastifyRequest<{
    Body: UpdateInput,
    Params: ReviewIdInput
}>, reply: FastifyReply){

    const body = request.body as Object
    const params = request.params
    const user = request.user as User

    try{
        const result = await findOneReview(params.reviewId)
        if (!result){
            return reply.code(404).send({error: true, msg: "Review not found"})
        } 
        if (user.id !== result.userId){
            return reply.code(401).send({error: true, msg: "Unauthorized"})
        }

        const review = await updateReview({id: params.reviewId}, body)
        return reply.code(200).send(review);
    }catch(e){
        console.log(e)
        return reply.code(500).send(e)
    }
}


export async function deleteReviewHandler(request: FastifyRequest<{
    Params: ReviewIdInput
}>, reply: FastifyReply){

    const params = request.params
    const user = request.user as User 
    try{
        const result = await findOneReview({id: params.reviewId})
        if(!result){
            return reply.code(404).send({error: true, msg:"review does not exist"})
        }

        if (result.userId !== user.id){
            return reply.code(403).send({error: true, msg:"Unauthorized"})
        }
        const res = await deleteReviewById(params.reviewId)
        return reply.code(200).send(res)
    }catch(e){
        console.log(e)
        return reply.code(500).send(e)
    }
}


export async function getReviewHandler(request: FastifyRequest<{
    Params: ReviewIdInput
}>, reply: FastifyReply){

    const params = request.params

    try{
        const res = await findOneReview(params.reviewId)
        return reply.code(200).send(res)
    }catch(e){
        console.log(e)
        return reply.code(500).send(e)
    }
}

export async function getReviewsHandler(request: FastifyRequest<{
    
}>, reply: FastifyReply){

    const params = request.params

    try{
        const res = await findReview({})
        return reply.code(200).send(res)
    }catch(e){
        console.log(e)
        return reply.code(500).send(e)
    }
}



export async function getUserReviewsHandler(request: FastifyRequest<{
    
}>, reply: FastifyReply){

    const user = request.user as User 

    try{
        const reviews = await findReview({userId: user.id})
        return reply.code(200).send(reviews)
    }catch(e){
        console.log(e)
        return reply.code(500).send(e)
    }
}


export async function getUserProductReviewsHandler(request: FastifyRequest<{
Params: ProductIdInput
}>, reply: FastifyReply){

    const params = request.params
    const user = request.user as User 

    try{
        const reviews = await findReview({productId: params.productId, userId: user.id})
        return reply.code(200).send(reviews)
    }catch(e){
        console.log(e)
        return reply.code(500).send(e)
    }
}

export async function getProductReviewsHandler(request: FastifyRequest<{
    Params: ProductIdInput
}>, reply: FastifyReply){

    const params = request.params 

    try{
        const reviews = await findReview({productId: params.productId})
        return reply.code(200).send(reviews)
    }catch(e){
        console.log(e)
        return reply.code(500).send(e)
    }
}