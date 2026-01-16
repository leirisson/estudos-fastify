import fastify from 'fastify'
import { routes } from './routes'
import fastifyCookie from '@fastify/cookie'
import { ZodError } from 'zod'

export const app = fastify()

app.register(fastifyCookie)


// 🔹 trtando os Errors Handler GLOBAL
// posso tratar os erros de dominio por aqui
app.setErrorHandler((error, request, reply) => {

  if (error) {
    return reply.status(401).send({
      error: 'Unauthorized'
    })
  }

  // Zod (se estiver usando)
  if (error instanceof ZodError) {
    return reply.status(400).send({
      error: 'Validation error',
      issues: error.format(),
    })
  }

  // Erro genérico
  return reply.status(500).send({
    error: 'Internal Server Error'
  })
})
app.register(routes)