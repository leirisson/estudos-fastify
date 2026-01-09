import { bootstrap } from "./app";
import { env } from "./env";


function startServer(){
    try {
        const app = bootstrap()
        app.listen({port: env.PORT})
        console.log(`serviço funcionando em: http://localhost:${env.PORT}`)
    } catch (error) {
        console.error(error)
    }
}

startServer()