import { app } from "./app.js";


function starServer() {
    try {
        app.listen({
            port: 3333,
            host: '0.0.0.0'
        })
        console.log(`server is runing => http://localhost:${3333}`)
    } catch (error) {
        console.log(error)
    }
}

starServer()

