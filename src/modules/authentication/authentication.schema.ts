import { buildJsonSchemas } from "fastify-zod";
import {z} from "zod"
import { ALL_USERTYPE } from "../../utils/usertype.util";


// model User {
//     id        Int       @id @default(autoincrement())
//     firstName String
//     lastName  String
//     email     String    @unique
//     username  String?
//     gender    String?
//     aboutme   String?
//     photoURL  String?
//     verified  Boolean
//     userType  String
//     password  String
//     salt      String
//     createdAt DateTime  @default(now())
//     updatedAt DateTime  @default(now())
//     products  Product[]
//   }



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


const createUsersSchema = z.object({
    ...userCore, 
    password: z.string({required_error: "Password is required"}).min(6)
})

const createUserResponseSchema = z.object({
    id: z.number(), 
    ...userCore, 
    createdAt: z.date(), 
    updatedAt: z.date()
})


// Login Schema 
const loginSchema = z.object({
    email: z.string({
        required_error: "Email is required", 
        invalid_type_error: "Email must be a string",
    }).email(),
    password: z.string(), 
})

const loginResponseSchema = z.object({
    id: z.string(),
    refreshToken: z.string(),
    accessToken: z.string()
})

// Verification code 
const verificationSchema = z.object({
    email: z.string(),
    code: z.number(),
})

const verificationResponseSchema = z.object({
    error: z.boolean(),
    msg: z.string(),
})



// Password update schema 
const updatePasswordSchema = z.object({
    email: z.string(),
    newPassword: z.string(),
})

const userIdSchema = z.object({
    id: z.number()
})

const userEmailSchema = z.object({
    email: z.string()
})




export type UserEmailInput = z.infer<typeof userEmailSchema>
export type UserIdParamInput = z.infer<typeof userIdSchema>
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>
export type VerifyCodeInput = z.infer<typeof verificationSchema>
export type CreateUserInput = z.infer<typeof createUsersSchema>
export type LoginUserInput = z.infer<typeof loginSchema>


const authModels = {
    createUsersSchema: createUsersSchema, 
    createUserResponseSchema: createUserResponseSchema, 
    loginSchema: loginSchema, 
    loginResponseSchema: loginResponseSchema, 
    verificationSchema: verificationSchema, 
    updatePasswordSchema: updatePasswordSchema,
    userIdSchema: userIdSchema,
    userEmailSchema:userEmailSchema,
    verificationResponseSchema: verificationResponseSchema,
}
export const {schemas: authSchema, $ref} = buildJsonSchemas<typeof authModels>(authModels, {$id: "authSchema"})
