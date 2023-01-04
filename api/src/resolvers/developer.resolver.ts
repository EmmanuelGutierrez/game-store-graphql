import { Developer } from '@prisma/client'
import { ResolverContext } from 'api/src/types/ResolverContext'

export const findAll = async (
  parent: unknown,
  args: unknown,
  context: ResolverContext
) => {
  return context.prisma.developer.findMany()
}

export const resolver: Record<keyof Developer, (parent: Developer) => unknown> =
  {
    id: (parent) => parent.id,
    createdAt: (parent) => parent.createdAt,
    updatedAt: (parent) => parent.updatedAt,
    deletedAt: (parent) => parent.deletedAt,
    gamesId: (parent) => parent.gamesId,
    name: (parent) => parent.name,
    description: (parent) => parent.description,
  }

export const createDeveloper = async (
  parent: unknown,
  {
    data,
  }: {
    data: Pick<Developer, 'name' | 'description'>
  },
  context: ResolverContext
) => {
  return context.prisma.developer.create({ data })
}
