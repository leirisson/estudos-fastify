import fastify from 'fastify'
import { routes } from './routes/index'


export function buildApp() {
    const app = fastify()

    // registrar rotas
    app.register(routes)

    return app
}



