import { GraphQLScalarType, Kind } from 'graphql'

export const DateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'Represents a date tipe object',
  serialize(value: any) {
    return value.toISOString()
  },
  parseValue(value: any) {
    return new Date(value)
  },
  parseLiteral(ast: any) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10))
    }
    return null
  },
})
