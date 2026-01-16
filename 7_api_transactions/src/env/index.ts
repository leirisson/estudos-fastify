import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

export const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
})

const env = envSchema.safeParse(process.env)

if (env.success === false) {
  console.error('Inavlid enviroment variable', env.error.format())
  throw new Error('Invalid enviroment variable')
}

export const _env = env.data
