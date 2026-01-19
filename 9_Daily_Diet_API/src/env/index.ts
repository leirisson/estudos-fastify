import 'dotenv/config'
import { z } from 'zod'


export const envbodySchema = z.object({
    PORT:z.coerce.number().default(3333),
    DATABASE_URL: z.string()
})


const _env = envbodySchema.safeParse(process.env)

if(_env.success === false){
    throw new Error('Erro nas variaveis de ambiente', _env.error)
}

export const env = _env.data