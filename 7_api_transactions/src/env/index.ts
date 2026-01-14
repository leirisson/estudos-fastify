import 'dotenv/config'
import {z} from 'zod'


export const envSchema = z.object({
        DATABASE_URL: z.string(),
        PORT: z.coerce.number().default(3333),
        CLIENT: z.string(),
        DIRECTORY: z.string()
})

export const _env = envSchema.parse(process.env)
