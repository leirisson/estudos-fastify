import { app } from './app'
import { _env } from './env'

function stratServer() {
  try {
    app.listen({
      port: _env.PORT,
    })
    console.log(`server is runing in ✅➡️ http://localhost:${_env.PORT} `)
  } catch (error) {
    console.log(error)
  }
}

stratServer()
