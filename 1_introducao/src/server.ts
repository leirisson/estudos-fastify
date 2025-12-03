import { app } from './app'

app.get('/hello', () => {
  return 'API funcionando.'
})

const porta = 3333
app
  .listen({
    port: porta,
  })
  .then(() => {
    console.log(`http://localhost:${porta}`)
  })
