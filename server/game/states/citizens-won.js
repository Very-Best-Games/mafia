import { ROLE } from '../roles'

export const citizensWon = {
  enter: (gameInstance) => {
    console.log('😇 Citizens won 😇')
    console.log('Winners:')
    gameInstance.printAlivePlayers(gameInstance.players.filter(p => p.alive && p.role === ROLE.CITIZEN))
    gameInstance.winner = ROLE.CITIZEN
    gameInstance.end()
  },
  update: (gameInstance, someData) => {
  },
  exit: () => {
  },
}
