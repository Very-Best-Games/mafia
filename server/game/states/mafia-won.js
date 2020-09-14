import { ROLE } from '../roles'

export const mafiaWon = {
  enter: (gameInstance) => {
    console.log('😈 Mafia won 😈')
    console.log('Winners:')
    gameInstance.printAlivePlayers(gameInstance.players.filter(p => p.alive && p.role === ROLE.MAFIA))
    gameInstance.winner = ROLE.MAFIA
    gameInstance.end()
  },
  update: (gameInstance, someData) => {
  },
  exit: () => {
  },
}
