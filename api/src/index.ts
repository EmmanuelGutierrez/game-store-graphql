import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'fs'
import path from 'path'
import resolvers from './resolvers'

const typeDefs = readFileSync(path.join(__dirname, 'schema.graphql'), 'utf-8')

const server = new ApolloServer({
  resolvers,
  typeDefs,
})

const prisma = new PrismaClient()

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async () => {
    return {
      prisma,
    }
  },
}).then(({ url }) => console.log(`API running on  ${url}`))
