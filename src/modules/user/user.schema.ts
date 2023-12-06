import { buildJsonSchemas } from "fastify-zod";
import { ALL_USERTYPE } from "src/utils/usertype.util";
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
   ownerId: z.number(),
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
    contactId: z.number()
})


// Carts 
const cartCore = {
    productId: z.number({required_error: "product id required"}),
}

const createcartSchema = z.object({
    ...cartCore, 
})

const cartResponseSchema = z.object({
    id: z.number(),
    ...contactCore, 
    name: z.string(), 
    description: z.string(),
    quanity: z.number(), 
    price: z.number(),
    totalPrice:z.number(),
    rating: z.number(),
    createdAt: z.date(), 
    updatedAt: z.date()
})

const cartReponsesSchema = z.array(cartResponseSchema)

const cartIdSchema = z.object({
    cartId: z.number()
})

// User 
const userCore = { 
    email: z.string({
        required_error: "Email is required", 
        invalid_type_error: "Email must be a string",
    }).email(),
    firstName: z.string({required_error: "First name is required"}),
    lastName: z.string({required_error: "Last name is required"}),
    aboutme: z.string(),
    username: z.string(), 
    gender: z.string(), 
    photoURL: z.string(), 
    userType: z.enum(ALL_USERTYPE),
}

const userDetailSchema = z.object({
    id: z.number(), 
    ...userCore,
    contact: contactResponseSchema, 
    addresses: z.array(addressResponseSchema),
    createdAt: z.date(), 
    updatedAt: z.date()
})


const userDetailIdSchema = z.object({
    userId: z.number()
})


// Affiliate LINK
const affLinkCore = { 
    productId: z.number({required_error: "product id required"}),
}

const createAffLinkSchema = z.object({
    ...affLinkCore,  
})

const affLinkResponseSchema = z.object({
    link: z.string()
})
const affLinksResponseSchema = z.array(affLinkResponseSchema)

const affLinkIdSchema = z.object({
    affLinkId: z.number()
})


const msg = z.object({
    error: z.boolean(), 
    msg: z.string()
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
export type UserDetailIdSchema = z.infer<typeof userDetailIdSchema>




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
    userDetailSchema: userDetailSchema,
    msg: msg, 
    cartReponsesSchema: cartReponsesSchema
}

export const {schemas: userSchema, $ref} = buildJsonSchemas<typeof userModels>(userModels, {$id: "userModels"})



