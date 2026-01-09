import 'dotenv/config'
import { z } from 'zod'


const envSchema = z.object({
    PORT: z.coerce.number().default(3333),
    NODE_ENV: z.enum(['develpment', 'test', 'production']).default('develpment')
})


export const env = envSchema.parse(process.env)

