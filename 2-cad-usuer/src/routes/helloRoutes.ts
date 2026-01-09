import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"

export async function helloRoutes(app: FastifyInstance) {
    app.get('/', (request: FastifyRequest, reply: FastifyReply) => {
        reply.send({ message: "ok" })
    })
}