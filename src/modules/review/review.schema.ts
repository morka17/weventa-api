import { buildJsonSchemas } from "fastify-zod";
import {z} from "zod"


  
const createReviewSchema = z.object({
    productId: z.number({required_error: "Product id required"}),
    content: z.string({required_error: "write a review comment"}), 
    rating: z.number({required_error:"rating value is required"})
})


const reviewResponseSchema = z.object({
    id: z.number(),
    userId: z.number(),
    productId: z.number({required_error: "Product id required"}),
    content: z.string({required_error: "write a review comment"}), 
    rating: z.number({required_error:"rating value is required"}),
    createdAt: z.date(), 
    updatedAt: z.date(),
})

const reviewsResponseSchema = z.array(reviewResponseSchema) 


const reviewIdSchema = z.object({
    reviewId: z.number()
})

const productIdSchema = z.object({
    productId: z.number()
})

const reviewOwnerIdSchema = z.object({
    ownerId: z.number()
})

const msg = z.object({
    error: z.boolean(), 
    msg: z.string()
})

const updateSchema = z.object({})

export type CreateReviewInput = z.infer<typeof createReviewSchema>
export type ReviewIdInput = z.infer<typeof reviewIdSchema>
export type ReviewOwnerIdInput = z.infer<typeof reviewOwnerIdSchema>


const reviewModels = {
    reviewResponseSchema: reviewResponseSchema, 
    reviewIdSchema: reviewIdSchema, 
    createReviewSchema: createReviewSchema,
    reviewOwnerIdSchema: reviewOwnerIdSchema, 
    msg: msg, 
    productIdSchema: productIdSchema,
    updateSchema: updateSchema, 
    reviewsResponseSchema: reviewsResponseSchema
}

export const {schemas: reviewSchema, $ref} = buildJsonSchemas<typeof reviewModels>(reviewModels, {$id: "reviewModels"})