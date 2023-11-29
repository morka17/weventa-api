import { generateRandomOTP } from "../../utils/jwt.util";
import { hashPassword } from "../../utils/hash";
import prisma from "../../utils/prisma.util";
import { CreateUserInput } from "./authentication.schema";



export async function createUser(input: CreateUserInput) {
    
    const {password, ...rest} = input

    const {hash, salt} = hashPassword(password)

    const user = await prisma.user.create({
        data: {...rest, salt, verified: false, password: hash}
    })

    return user 
}


export async function findUserByEmail(email: string){
    return prisma.user.findUnique({
        where: {email}
    })
}

export async function findUserById(id: number){
    return prisma.user.findUnique({
        where: {id}
    })
}



export async function findUsers(){
    return prisma.user.findMany({
     select:{
         id: true,
         firstName: true, 
         lastName: true,
         username: true, 
         userType: true, 
         gender: true, 
         aboutme: true,
         email: true, 
     }
    }); 
 }


 export async function updateUserVerified(email: string, verified: boolean){
    const user = await   prisma.user.update({
         where: {email},
         data: {verified: verified}, 
         select: {
             id: true,
             firstName: true, 
             lastName: true,
             username: true, 
             userType: true, 
             gender: true, 
             aboutme: true,
             email: true, 
         }
     })
 
     return user
  }
 
 

 export async function updateUserPassword(email: string, newPassword: string){
   const user = await   prisma.user.update({
        where: {email},
        data: {password: newPassword}, 
        select: {
            id: true,
            firstName: true, 
            lastName: true,
            username: true, 
            userType: true, 
            gender: true, 
            aboutme: true,
            email: true, 
        }
    })

    return user
 }



 export async function deleteUser(id: number) {
    prisma.user.delete({
        where: {id}
    })
 }


 

//  Verification session 
// ====> Create 
export  async function createVerificationSession(email: string){
    const now = new Date()
    console.log(generateRandomOTP())

    const data = {
        email: email, 
        code: generateRandomOTP(), 
        expireAt: new Date(now.setMinutes(now.getMinutes() + 15))  // 15 Minutes 
    }

    const session = await  prisma.verificationSession.create({
        data: data
    })

    return session
}

// ====> Update 
export async function updateVerificationSession(email: string){
    const now = new Date()
    const data = {
        email: email, 
        code: generateRandomOTP(), 
        expireAt: new Date(now.setMinutes(now.getMinutes() + 15))  // 15 Minutes 
     }

   const session =  await prisma.verificationSession.update({
        where: {email}, 
        data: data, 
    })

    return session
    
}

export async function findVerificationSession(email: string){
    const session = await prisma.verificationSession.findFirst({
        where: {email}
    })

    return session 
}