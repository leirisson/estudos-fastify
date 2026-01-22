import { fastify } from 'fastify'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'



export const app = fastify()

app.register(appRoutes, { prefix: '/api/v1' })


//  tratando o erro globalmente 
app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply
            .status(400)
            .send({
                message: "Validation Error",
                issue: error.format()
            })
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error)
    } else {
        // aqui mandaria log para uma ferramenta externa de observabilidade
    }

    return reply.status(500).send({ messge: "internal server error." })
})