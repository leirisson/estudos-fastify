import 'dotenv/config'
import { z } from 'zod'


const envSchema = z.object({
    PORT: z.coerce.number().default(3333),
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev')
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
    console.error("❌ Erro de validação nas variaveis de ambiente", _env.error.format())
    throw new Error("❌ Erro de validação nas variaveis de ambiente")
}


export const env = _env.data