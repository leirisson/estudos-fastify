# estudos-fastify

## ultilização do tsx, tsc, knex, fastify
## npm install fastify 
## npm install tsx -D 
## npm install knex --save
## npm install sqlite3


# observação: o knex precisa de ser configurado para typescript
# criar uma tabela no banco de dados

<!-- comando para criar a migrations da trabela -->
#  npm run knex -- migrate:make document

<!-- comando para criar a tabela no banco de dados -->
# npm run knex -- migrate:latest

<!-- esse comando deve estra nos scripts do package.json -->
<!-- # "knex" :"node --import tsx ./node_modules/knex/bin/cli.js" -->