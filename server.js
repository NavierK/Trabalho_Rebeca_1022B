import {fastify} from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const database = new DatabaseMemory()
const server = fastify()

server.get('/', () => {
    return 'Rota padrão'
})

server.post('/blusa', (request, reply) => {
// Acessando dados do corpo da requisição
    const {banda, marca, tamanho} = request.body
// Exibindo dados
//    console.log(body)
   
    // return 'cadastrar'
    database.create({
        banda: banda,
        marca: marca,
        tamanho: tamanho,
    })

    return reply.status(201).send
})

server.get('/blusa', (request) => {
    const search = request.query.search
    console.log(search)
    const blusas = database.list(search)
    console.log(blusas)
    return blusas
})

server.put('/blusas/:id', (request, reply) => {
    const blusaId = request.params.id
    const {banda, marca, tamanho} = request.body
    const blusa = database.update(blusaId, {
        banda: banda,
        marca: marca,
        tamanho: tamanho,
    })
    return reply.status(204).send()
})

server.delete('/blusas/:id', (request, reply) => {
    const blusaId = request.params.id

    database.delete(blusaId)

    return reply.status(204).send()
}) 

server.listen({
    port: 3333,
})