import 'dotenv/config'
import { z } from 'zod'

export const envSchema = z.object({
  PORT: z.coerce.number(),
  DATABASE_URL: z.string(),
  CLIENT: z.string(),
  DIRECTORY: z.string(),
})

export const _env = envSchema.parse(process.env)
