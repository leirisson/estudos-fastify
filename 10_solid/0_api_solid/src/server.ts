import { app } from "@/app";
import { env } from "@/env";


function starServer() {
    try {
        app.listen({
            port: env.PORT,
            host: '0.0.0.0'
        })
        console.log(`server is runing => http://localhost:${env.PORT}`)
    } catch (error) {
        console.log(error)
    }
}

starServer()

