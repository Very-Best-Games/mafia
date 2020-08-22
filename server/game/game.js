import { lobby } from './states/lobby'

export const game = {
  dayNumber: 0,
  players: undefined,
  currentState: undefined,
  finished: false,
  winner: undefined,
  changeState: (newState) => {
    if (game.currentState) {
      game.currentState.exit(game)
    }
    game.currentState = newState
    game.currentState.enter(game)
  },
  start: () => {
    game.changeState(lobby)
  },
  update: (someData) => {
    game.currentState.update(game, someData)
  },
  printAlivePlayers: (players) => {
    console.log(players.filter(p => p.alive).map(p => p.name).join(', '))
  },
  end: () => {
    game.finished = true
  }
}
