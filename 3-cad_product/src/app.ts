import fastify from 'fastify'
import { routes } from './routes'
export function bootstrap() {
    const app = fastify()

    app.register(routes)
    return app
}