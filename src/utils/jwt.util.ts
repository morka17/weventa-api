import jwt from "jsonwebtoken"
import { env } from "../config/env"
import crypto from "crypto"



export function generateRandomOTP() {
    const randomBytes = crypto.randomBytes(6);
    const randomNumber = randomBytes.toString('hex').slice(0, 5);
   
    return parseInt(randomNumber, 16)
}


export function signJWT(object: Object,  options?: jwt.SignOptions | undefined) {

    return jwt.sign(object, env.PRIVATE_KEY, {
        ...(options && options), // check if it is defined 
        algorithm:"RS256"
    })
}


export function verifyJWT(token: string){
    try{
        const decoded = jwt.verify(token, env.PUBLIC_KEY)
        return {
            valid: true , 
            expired : false,
            decoded, 
        }
    }catch(error: any){
        return {
            valid: false, 
            expired : error.message  === 'jwt expired',
            decoded:null 
        }
    }
}