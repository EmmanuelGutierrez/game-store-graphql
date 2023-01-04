import * as game from './game.resolver'
import * as developer from './developer.resolver'
import * as scalars from './scalarsl'

export default {
  ...scalars,
  Query: {
    games: game.findAll,
    developers: developer.findAll,
  },
  Mutation: {
    createGame: game.createGame,
    createDeveloper: developer.createDeveloper,
  },
  Game: game.resolver,
  Developer: developer.resolver,
}
