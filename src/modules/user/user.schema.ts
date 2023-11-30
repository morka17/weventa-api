import { buildJsonSchemas } from "fastify-zod";
import {z} from "zod"



// Address 
const addressCore = {
    streetLine: z.string({required_error: "street line required"}),
    city: z.string({required_error: "city required"}),
    state: z.string({required_error: "state required"}),
    country: z.string({required_error: "country required"}),
    default: z.boolean({required_error: "default required"}),
}
const createAddressSchema = z.object({
    ...addressCore
}) 

const addressResponseSchema = z.object({
   id: z.number(), 
   ...addressCore, 
   createdAt: z.date(), 
    updatedAt: z.date()
}) 

const addressesResponseSchema = z.array(addressResponseSchema)

const addressIdSchema = z.object({
    addressId: z.number()
})

// Contacts
const contactCore = {
    phoneNumber: z.string({required_error: "phone number required"}),
    facebook: z.string(),
    instagram: z.string(), 
    linkedIn: z.string(), 

}
const createContactSchema = z.object({
    ...contactCore, 
})

const contactResponseSchema = z.object({
    id: z.number(),
    ...contactCore, 
    createdAt: z.date(), 
    updatedAt: z.date()
})

const contactIdSchema = z.object({
    addressId: z.number()
})


// Carts 
const cartCore = {
    productId: z.string({required_error: "product id required"}),
}

const createcartSchema = z.object({
    ...cartCore, 
})

const cartResponseSchema = z.object({
    id: z.number(),
    ...contactCore, 
    name: z.string(), 
    description: z.string(),
    price: z.number(),
    rating: z.number(),
    createdAt: z.date(), 
    updatedAt: z.date()
})

const cartIdSchema = z.object({
    cartId: z.number()
})


// Affiliate LINK
const affLinkCore = { 
    productId: z.string({required_error: "product id required"}),
}

const createAffLinkSchema = z.object({
    ...affLinkCore,  


})

const affLinkResponseSchema = z.object({
    Id: z.number(),
    ...affLinkCore, 
    ownerId: z.number(), 
    createdAt: z.date(), 
    updatedAt: z.date()
})
const affLinksResponseSchema = z.array(affLinkResponseSchema)

const affLinkIdSchema = z.object({
    affLinkId: z.number()
})



const updateSchema = z.object({})

export type CreateAddressInput = z.infer<typeof  createAddressSchema>
export type AddressIdInput = z.infer<typeof addressIdSchema>
export type UpdateInput =  z.infer<typeof updateSchema>
export type ContactsInput = z.infer<typeof createContactSchema>
export type ContactsIdInput = z.infer<typeof contactIdSchema>
export type CreateCartIput = z.infer<typeof createcartSchema>
export type CartIdInput = z.infer<typeof cartIdSchema>
export type CreateAffLinkInput = z.infer<typeof createAffLinkSchema>
export type AffLinkIdInput = z.infer<typeof affLinkIdSchema>




const userModels = {
    createAddressSchema: createAddressSchema, 
    addressResponseSchema: addressResponseSchema, 
    addressesResponseSchema: addressesResponseSchema, 
    addressIdSchema: addressIdSchema,
    updateSchema: updateSchema,
    createContactSchema: createContactSchema, 
    contactIdSchema: contactIdSchema, 
    cartIdSchema: cartIdSchema, 
    createcartSchema: createcartSchema, 
    cartResponseSchema: cartResponseSchema,
    contactResponseSchema: contactResponseSchema,
    createAffLinkSchema: createAffLinkSchema, 
    affLinkIdSchema: affLinkIdSchema, 
    affLinkResponseSchema: affLinkResponseSchema, 
    affLinksResponseSchema: affLinksResponseSchema, 
}

export const {schemas: userSchema, $ref} = buildJsonSchemas<typeof userModels>(userModels, {$id: "userModels"})



