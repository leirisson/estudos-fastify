import 'dotenv/config'
import { z } from 'zod'


const envBodySchema = z.object({
    NODE_ENV: z.enum(['dev','test', 'production']).default('dev'),
    PORT: z.coerce.number().default(3335),
    DATABASE_URL: z.string()
})

const _env = envBodySchema.safeParse(process.env)

if(_env.success === false){
    console.error('Erro nas variaveis de ambiente', _env.error.format())
    throw new Error('Erro nas variaveis de ambiente')
}

export const env = _env.data