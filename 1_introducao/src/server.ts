import { app } from './app'
import { knex } from './knex_config/knex'

app.get('/hello', ()   => {
  return 'API funcionando.'
})


app.get("/criar-tabela", async () => {
  const tables = await knex('sqlite_schema').select('*')
  return tables
})


const porta = 3333
app
  .listen({
    port: porta,
  })
  .then(() => {
    console.log(`http://localhost:${porta}`)
  })
