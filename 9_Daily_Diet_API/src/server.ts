import { app } from './app'
import { env } from './env'

function startServer() {
    try {
        app.listen({ port: env.PORT })
        console.log(`server rodando no endreco: http://localhost:${env.PORT}`)
    } catch (error) {
        console.log(error)
    }
}

startServer()