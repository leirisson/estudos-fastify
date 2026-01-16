import fastify from 'fastify'
import { routes } from './routes'
import fastifyCookie from '@fastify/cookie'
import { ZodError } from 'zod'

export const app = fastify()
app.register(fastifyCookie)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      error: 'Validation error',
      issues: error.format(),
    })
  }
  const statusCode =
    typeof (error as any).statusCode === 'number' &&
    (error as any).statusCode >= 400 &&
    (error as any).statusCode < 600
      ? (error as any).statusCode
      : 500
  const message = statusCode === 500 ? 'Internal Server Error' : (error as any).message || 'Error'
  return reply.status(statusCode).send({ error: message })
})

app.register(routes)
