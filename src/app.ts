import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifyJwt from "@fastify/jwt"
import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUi from "@fastify/swagger-ui"
import { authSchema } from "./modules/authentication/authentication.schema";
import authRoutes from "./modules/authentication/authentication.route";
// import api from "api"
import { env } from "./config/env";
import { User } from "./utils/user.util";
import { productRoute } from "./modules/product/product.route";
import { productSchema } from "./modules/product/product.schema";
import fastifyGuard from "fastify-guard";



export const server = Fastify({logger: true})


declare module "fastify"{
    export interface FastifyInstance{
        authenticate: any
    }
}


// register JWT 
server.register(fastifyJwt, {
    secret: env.PRIVATE_KEY
})


// server.register(FastifyZod)


// authenticaton
server.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
    console.log("Authentication")
    // Get the access tken from the request header 
    const accessToken = request.headers["authorization"]?.replace("Bearer ", "")
    const refreshToken = request.headers["refreshToken"]

    if (!accessToken){
        // Invalid request
        return reply.code(403).send({error: true, msg: "Access token required"}) 
    }

    try {
        // await request.jwtVerify()
        // Verify access token 
        const payload = server.jwt.verify(accessToken!)
        if (payload){
            request.user = payload as User
        }


    }catch(e: any){
        if (e.message === "jwt expired"){
            try {
                if (!refreshToken){
                    // Invalid request
                    return reply.code(403).send({error: true, msg: "refresh token required"})  
               }
           
                // Verify the refresh token
            const refreshPayload =  server.jwt.verify(refreshToken!.toString())
            if (!refreshPayload) {
                return reply.code(403).send({error: true, msg: "Unauthorized"}) 
            }

            // Find the user session 
            const   newAccessToken = server.jwt.sign(refreshPayload)

            // Set the access token in the response header
            reply.header("Authorization", `Bearer ${newAccessToken}`);

            
            }catch(e){
                return reply.code(500).send({error: true, msg:e})
            }
        }
        return reply.code(500).send(e)
    }
});

server.get("/healthcheck", async function(){
    return {status:"OK"}
})


async function main(){

   

    

    // Add schemas 
    for (const schema of [...authSchema, ...productSchema] ){
        server.addSchema(schema)
    }
   
    
    // swaggerui doc 
    server.register(fastifySwagger, {
        openapi:{
            info:{
                title: "Weventa API", 
                description: "Weventa API documentation and usage", 
                version: "1.0.0",
            }, 
            servers: [
                {
                    url: "http://localhost:3000"
                }
            ]
        }
    })

    server.register(fastifySwaggerUi, {
        routePrefix: "/docs", 
        uiConfig: {
            docExpansion: "full", 
            deepLinking: false
        }
    })

    // Guard 
    server.register(fastifyGuard, {
        requestProperty: "user", 
        scopeProperty: "userType",
        errorHandler: (result, request, reply) => {
            return reply.send("Unauthorized to perform this action")
        }
    })
    

    // Register routes 
    server.register(authRoutes, {prefix: "/api/v1/auth"})
    server.register(productRoute, {prefix: "/api/v1/product"})


    try{
        await server.listen(3000, "0.0.0.0")
        server.swagger()

        console.log("Swagger UI started on port 3000")
        console.log(`Server ready at http://localhost:3000`)
    }catch(e){
        console.error(e) 
        process.exit(-1)
    }
}




main()


export default server