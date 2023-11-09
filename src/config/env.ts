import zennv from "zennv"
import {z} from "zod"


export const env = zennv({
    dotenv: true, 
    schema: z.object({
        PRIVATE_KEY: z.string(),
        PUBLIC_KEY: z.string()
    })
})