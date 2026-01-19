import fastfy from 'fastify'
import { routes } from './routes'
import {fastifyCookie} from '@fastify/cookie'

export const app = fastfy()

app.register(fastifyCookie)
app.register(routes)

