import { FastifyReply, FastifyRequest } from "fastify"
import { CreateUserInput, LoginUserInput, UpdatePasswordInput, UserEmailInput, UserIdParamInput, VerifyCodeInput } from "./authentication.schema"
import { createUser, createVerificationSession, findUserByEmail, findUserById, findUsers, findVerificationSession, updateUserPassword, updateUserVerified, updateVerificationSession } from "./authentication.service"
import { verifyPassword } from "../../utils/hash"
import { server } from "../../app"





export async function registerUserHandler(request: FastifyRequest<{
    Body: CreateUserInput
}>, reply: FastifyReply){

    const body = request.body

    try {
        const user = await createUser(body)
        return reply.code(201).send(user)
    }catch(e){
        console.log(e)
        return reply.code(500).send(e)
    }
}


export async function loginHandler(request: FastifyRequest<{
    Body: LoginUserInput
}>, reply: FastifyReply){

    const body = request.body 

    // find a user by email 
    const user = await findUserByEmail(body.email)
    if (!user){
        return reply.code(401).send({
            error: true,
            message: "Invalid email or password"
        })
    }

    // Verify password 
    const correctPassword = verifyPassword({
        candidatePassword: body.password, 
        salt: user.salt, 
        hash: user.password
    })

    if (correctPassword){
        const  {password, salt, ...rest} = user 

        // Check if the account is verified 
        if (!user.verified){
            return reply.code(401).send({
                error: true,
                message: "Please verify your account"
            })
        }
        
        // Generate an access token 
        const accessToken = server.jwt.sign(rest)

        // Generate a refresh token 
        const refreshToken = server.jwt.sign({...rest, refreshToken: true,})

        // Set the access token in the response header 
        reply.header("Authorization", `Bearer ${accessToken}`)

        return {id: rest.id, accessToken: accessToken, refreshToken: refreshToken }
    }

    return reply.code(401).send({
        message: "Invalid email or password",
    })
}


// Verify Code
export async function verifyCode(request: FastifyRequest<{
    Body: VerifyCodeInput
}>, reply: FastifyReply){
    const {code, email} = request.body;


    const found = await findVerificationSession(email)
   
    if (found){
        const now = new Date()
        if ( now > found.expireAt  ) {
            return reply.code(401).send({error: true, msg: "Expired OTP"})
        }
        if (found.code === code ){
            // Retrieve the user 
            const user = await updateUserVerified(email, true)
           if (user === null){
            return reply.code(401).send({error: true, msg: "user not found"})
           }

             // Generate an access token 
            const accessToken = server.jwt.sign(user)

            // Generate a refresh token 
            const refreshToken = server.jwt.sign({...user, refreshToken: true,})

            // Set the access token in the response header 
            reply.header("Authorization", `Bearer ${accessToken}`)

            return {id: user.id, accessToken: accessToken, refreshToken: refreshToken }
        }

        return reply.code(401).send({error: true, msg: "Invalid code"})
    }

    return reply.code(401).send({error: true, msg: "Unauthorized"})
}


// Send Verification 
export async function sendVerificationCode(request: FastifyRequest<{
    Body: UserEmailInput 
}>, reply: FastifyReply){

    const {email} = request.body;

    // Check if the user already exist 
    const found = await findVerificationSession(email)
    if (found){
       const res = await updateVerificationSession(email)
       return reply.code(200).send({error: false, msg: `OTP ${res.code} send successfully`})
    }

    try{
       const session = await createVerificationSession(email)
       return reply.code(200).send({error: false, msg: `OTP ${session.code} send successfully`})

    }catch(e){
        console.log(e)
        return reply.code(500).send({error: true, msg: e })
    }

}

// Send Forgot password Verification 
export async function sendforgotPasswordVerificationCode(request: FastifyRequest<{
    Body: UserEmailInput 
}>, reply: FastifyReply){

    const {email} = request.body;

    // Check if the user already exist 
    const found = await findVerificationSession(email)
    if (found){
       const res = await updateVerificationSession(email)
       return reply.code(200).send({error: false, msg: `OTP ${res.code} send successfully`})
    }

    try{
       const session = await createVerificationSession(email)
       return reply.code(200).send({error: false, msg: `OTP ${session.code} send successfully`})

    }catch(e){
        console.log(e)
        return reply.code(500).send({error: true, msg: e })
    }

}



// Change password 
export async function updatePassword(request: FastifyRequest<{
    Body: UpdatePasswordInput
}>, reply: FastifyReply){

  const {email, newPassword} = request.body

  try{
    const user = await updateUserPassword(email, newPassword)
    return reply.code(200).send(user)
  }catch(e){
    console.log(e)
    return reply.code(403).send(e)
  }

}


export async function getUsersHandler(){
    const users = await findUsers()
    return users
}