import type { Attributes, Game, PrismaClient } from '@prisma/client'

type ResolverContext = {
  prisma: PrismaClient
}

/* const games: Game[] = [
  {
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
    name: 'Pinkerton Avocado',
    id: 'fpr72m9k',
    sku: 'B4HZ42TM',
    price: 1.27,
    image: '/images/pinkerton.jpg',
    developersId: [''],
    attributes: {
      description:
        "First grown on the Pinkerton Ranch in Saticoy, California, in the early 1970s, 'Pinkerton' is a seedling of 'Hass' x 'Rincon'. The large fruit has a small seed, and its green skin deepens in color as it ripens. The thick flesh has a smooth, creamy texture, pale green color, good flavor, and high oil content. It shows some cold tolerance, to −1 °C (30 °F) and bears consistently heavy crops. A hybrid Guatemalan type, it has excellent peeling characteristics",
      relaseDate: new Date(),
      reviews: [],
    },
  },
] */

export const findAll = (
  parent: unknown,
  args: unknown,
  context: ResolverContext
) => {
  return context.prisma.game.findMany({ include: { developers: true } })
}

/* export const findOne = () => {
  return avos[0]
} */

export const resolver: Record<keyof Game, (parent: Game) => unknown> = {
  id: (parent) => parent.id,
  createdAt: (parent) => parent.createdAt,
  updatedAt: (parent) => parent.updatedAt,
  deletedAt: (parent) => parent.deletedAt,
  developersId: (parent) => parent.developersId,
  sku: (parent) => parent.sku,
  name: (parent) => parent.name,
  image: (parent) => parent.image,
  price: (parent) => parent.price,
  attributes: (parent) => ({
    description: parent.attributes.description,
    relaseDate: parent.attributes.relaseDate,
    reviews: parent.attributes.reviews,
  }),
}

/*  name: String!
  price: Float!
  image: String!
  sku: String!
  description: String
  relaseDate: DateTime

  developersId: [ID]! */

export const createGame = (
  parent: unknown,
  {
    data: { description, relaseDate, ...inputData },
  }: {
    data: Pick<Game, 'name' | 'price' | 'image' | 'sku' | 'developersId'> &
      Pick<Attributes, 'description' | 'relaseDate'>
  },
  context: ResolverContext
) => {
  return context.prisma.game.create({
    data: {
      ...inputData,
      attributes: {
        description: description,
        relaseDate: relaseDate,
      },
    },
  })
}
