import 'dotenv/config'
import z from 'zod'


const EnvValidationSchema = z.object({
    PORT: z.coerce.number().default(3333),
    DATABASE_URL: z.string(),
    OPEN_AI_API_KEY: z.string(),
    OPEN_MODEL: z.string(),
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev')
})


const _env = EnvValidationSchema.safeParse(process.env)

if (_env.success === false) {
    console.error("❌ Erro de validação nas variaveis de ambiente", _env.error.format())
    throw new Error("❌ Erro de validação nas variaveis de ambiente")
}


export const env = _env.data