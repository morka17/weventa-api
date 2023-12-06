import { z} from "zod"
import { ALL_PRODUCT_TYPE } from "../../utils/usertype.util"
import { buildJsonSchemas } from "fastify-zod"

// Product schema 

const productCore = {
    name: z.string({
        required_error: "Product name is required", 
    }), 
    description: z.string({
        required_error: "Product description is required"
    }), 
    imageURL: z.array(z.string()),
    downloadURL: z.string(),
    productType: z.enum(ALL_PRODUCT_TYPE), 
    price: z.number({
        required_error: "Product price is required",
    }),
    commission: z.number({
        required_error: "Product commission price is required",
    }), 
    discountPrice: z.number({
        required_error: "Product discount price is required",
    }), 

}

const createProductSchema = z.object({
    ...productCore
})

const createProductResponseSchema = z.object({
   
    id: z.number(),
    ...productCore, 
    createdAt: z.date(), 
    updatedAt: z.date()
})

const productIdSchema = z.object({
    productId: z.number()
})


const vendorIdSchema = z.object({
    vendorId: z.number()
})


const searchProductSchema = z.object({
    queryString: z.string()
})

const defaultResponse = z.object({
    error: z.boolean(),
    msg: z.string()
})

const productsSchema = z.array(createProductResponseSchema)



// TYPES 
export type CreateProductInput = z.infer<typeof createProductSchema>
export type ProductIdInput = z.infer<typeof productIdSchema>
export type VendorIdInput = z.infer<typeof vendorIdSchema>
export type searchProductInput = z.infer<typeof searchProductSchema>


const productModels = {
    createProductSchema, 
    createProductResponseSchema,
    productIdSchema, 
    vendorIdSchema, 
    searchProductSchema,
    defaultResponse,
    productsSchema,
}

export const {schemas: productSchema, $ref} = buildJsonSchemas<typeof productModels>(productModels,  {$id: "productSchema"})