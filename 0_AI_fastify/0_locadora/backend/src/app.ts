import Fastify from 'fastify'
import cors from '@fastify/cors'
import { carsRoutes } from './modules/cars/cars.routes'

export async function buildApp(){

    const app = Fastify({
        logger: true
    })

    await app.register(cors, {origin: true})


    app.get("/status", async () =>({
        status: 200,
        msg: "API Funcionando ✅"
    }))

    app.register(carsRoutes)

    return app
}