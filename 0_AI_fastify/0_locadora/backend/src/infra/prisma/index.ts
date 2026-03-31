import { env } from "../env/index.js"
import { PrismaClient } from "../../generated/prisma/client.js"

import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })

const prisma = new PrismaClient({
    adapter,
    log: env.NODE_ENV === 'dev' ? ['query'] : []
})



export default prisma
