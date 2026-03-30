import { buildApp } from "./app";
import { env } from './infra/env/index'

async function bootsrap() {
    const app = await buildApp()

    try {
        await app.listen({
            port: env.PORT,
            host: "0.0.0.0"
        })
        console.log(`server is ruing in => http://localhost:${env.PORT}`)
    } catch (error) {
        console.log('Falha ao tentar subir o servidor: ',error)
        process.exit(1)
    }
}


void bootsrap()