import {app} from './app'
import { env } from './env'

function startServer(){
    try {
        app.listen({host: '0.0.0.0', port: env.PORT})
        console.log(`server in runing in http://localhost:${env.PORT}`)
    } catch (error) {
        console.error(error)
    }
}

startServer()