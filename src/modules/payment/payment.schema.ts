import { z} from "zod"
import { buildJsonSchemas } from "fastify-zod"




// Sale 
const saleCore =  {
    price: z.number(), 
    earning: z.number(), 
    productId: z.number(), 
    buyerId: z.number(),
}

const createSaleSchema= z.object({
    ...saleCore, 
})


const saleResponseSchema= z.object({
    id: z.number(), 
    ...saleCore, 
    data: z.date(), 
    buyerName: z.string(),
    buyerId: z.number(),
    ownerId: z.number()
})

const saleIdSchema = z.object({
    saleId: z.string({required_error: "Sale id required"}),
})

const saleResponsesSchema = z.array(saleResponseSchema)

export type CreateSaleInput = z.infer<typeof createSaleSchema>
export type SaleIdInput = z.infer<typeof saleIdSchema>



const paymentModels = {
    createSaleSchema, 
    saleResponseSchema, 
    saleResponsesSchema, 
    saleIdSchema, 
}


export const {schemas: paymentSchema, $ref} = buildJsonSchemas<typeof paymentModels>(paymentModels,  {$id: "paymentSchema"})

