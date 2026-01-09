import { buildApp } from './app'

async function startServer() {
  const app = buildApp()

  try {
    await app.listen({
      port: 3333,
    })

    console.log('🚀 Server rodando em http://localhost:3333')
  } catch (error) {
    console.error(error)

  }
}

startServer()