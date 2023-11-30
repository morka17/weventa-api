import { buildJsonSchemas } from "fastify-zod";
import {z} from "zod"


  
const createReviewSchema = z.object({
    productId: z.number({required_error: "Product id required"}),
    content: z.string({required_error: "write a review comment"}), 
    rating: z.number({required_error:"rating value is required"})
})


const reviewResponseSchema = z.object({
    userId: z.number(),
    productId: z.number({required_error: "Product id required"}),
    content: z.string({required_error: "write a review comment"}), 
    rating: z.number({required_error:"rating value is required"}),
    createdAt: z.date(), 
    updatedAt: z.date(),
})



const reviewIdSchema = z.object({
    reviewId: z.number()
})

const reviewOwnerIdSchema = z.object({
    ownerId: z.number()
})


export type CreateReviewInput = z.infer<typeof createReviewSchema>
export type ReviewIdInput = z.infer<typeof reviewIdSchema>
export type ReviewOwnerIdInput = z.infer<typeof reviewOwnerIdSchema>


const reviewModels = {
    reviewResponseSchema: reviewResponseSchema, 
    reviewIdSchema: reviewIdSchema, 
    createReviewSchema: createReviewSchema,
    reviewOwnerIdSchema: reviewOwnerIdSchema
}

export const {schemas: reviewSchema, $ref} = buildJsonSchemas<typeof reviewModels>(reviewModels, {$id: "reviewModels"})