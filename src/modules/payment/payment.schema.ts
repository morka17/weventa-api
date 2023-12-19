import { z } from "zod"
import { buildJsonSchemas } from "fastify-zod"


// Affiliate 
const linkIdSchema = z.object({
    linkId: z.string(),
})



// Sale 
const saleCore = {
    price: z.number(),
    earning: z.number(),
    productId: z.number(),
    buyerId: z.number(),
    ownerId: z.number()
}

const createSaleSchema = z.object({
    ...saleCore,
})


const saleResponseSchema = z.object({
    id: z.number(),
    ...saleCore,
    data: z.date(),
    buyerName: z.string(),
    buyerId: z.number(),
    ownerId: z.number()
})

const saleIdSchema = z.object({
    saleId: z.string({ required_error: "Sale id required" }),
})

const saleResponsesSchema = z.array(saleResponseSchema)

// Payment 
const paystackInitializeResponse = z.object({
    status: z.boolean(),
    message: z.string(),
    data: z.object({ authorization_url: z.string(), access_code: z.string(), reference: z.string() })
})


// Order 
const orderResponse = z.object({
    error: z.boolean(),
    message: z.string(),
    status: z.string(),
    data: z.object({
        payment_url: z.string(),
    })
})

const orderSchema = z.object({
    reference: z.string(),
    amount: z.number(),
    status: z.string(),
})

const orderIdSchema = z.object({
    orderId: z.string({ required_error: "Order id required" }),
})


export type OrderResponse = z.infer<typeof orderResponse>
export type OrderIdInput = z.infer<typeof orderIdSchema>
export type CreateOrderInput = z.infer<typeof orderSchema>
export type CreateSaleInput = z.infer<typeof createSaleSchema>
export type SaleIdInput = z.infer<typeof saleIdSchema>
export type PaystackInitializeResponse = z.infer<typeof paystackInitializeResponse>
export type LinkIdInput = z.infer<typeof linkIdSchema>


const paymentModels = {
    createSaleSchema,
    saleResponseSchema,
    saleResponsesSchema,
    saleIdSchema,
    paystackInitializeResponse,
    orderSchema,
    orderResponse,
    linkIdSchema

}


export const { schemas: paymentSchema, $ref } = buildJsonSchemas<typeof paymentModels>(paymentModels, { $id: "paymentSchema" })

