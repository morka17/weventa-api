import { FastifyInstance } from "fastify";
import { loginHandler, registerUserHandler, sendVerificationCode, sendforgotPasswordVerificationCode, updatePassword, verifyCode } from "./authentication.controller";
import { $ref } from "./authentication.schema";


async function authRoutes(server:FastifyInstance) {

    
    server.post("/signup", 
    {schema: {body: $ref("createUsersSchema"), tags: ["authentication"], response: {201: $ref("createUserResponseSchema")}}},
     registerUserHandler,
    )

    server.post("/login", 
    {schema: {body: $ref("loginSchema"),  tags: ["authentication"], response: {201: $ref("loginResponseSchema")}}},
    loginHandler,
    )

    
    server.post("/sendOTP", 
    {schema: {body: $ref("userEmailSchema"), tags: ["authentication"], response: {201: $ref("verificationResponseSchema")}}},
    sendVerificationCode,
    )

    server.post("/forgotPasswordOTP", 
    {schema: {body: $ref("userEmailSchema"),  tags: ["authentication"], response: {201: $ref("verificationResponseSchema")}}},
    sendforgotPasswordVerificationCode,
    )


    server.post("/verifyOTP", 
    {schema: {body: $ref("verificationSchema"),  tags: ["authentication"], response: {201: $ref("loginSchema")}}},
    verifyCode,
    )

    server.post("/changePassword", 
    
    {preHandler: server.authenticate, schema: {body: $ref("updatePasswordSchema"),  tags: ["authentication"], response: {201: $ref("createUserResponseSchema")}}},
    updatePassword,
    )

}



export default authRoutes