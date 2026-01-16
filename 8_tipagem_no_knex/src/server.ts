import { app } from './app'
import { _env } from '../src/env'

function startServer() {
  try {
    app.listen({ port: _env.PORT })
    console.log(`server is ruining ... ✅`)
  } catch (error) {
    console.log(error)
  }
}

startServer()
