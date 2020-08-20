import { ROLE } from '../roles'
import { night } from './night'
import { citizensWon } from './citizens-won'
import { mafiaWon } from './mafia-won'

export const day = {
  enter: (gameInstance) => {
    gameInstance.dayNumber++
    console.log(`Day number ${ gameInstance.dayNumber }`)
  },
  update: (gameInstance, { vote }) => {
    const voteResults = Object.values(vote).reduce((memo, playerName) => {
      if (!memo[playerName]) {
        memo[playerName] = 0
      }
      memo[playerName]++
      return memo
    }, {})

    const result = Object.entries(voteResults).reduce((memo, voteResult) => {
      if (!memo) {
        return voteResult
      }
      // TODO check if same number of votes
      if (voteResult[1] > memo[1]) {
        return voteResult
      }
      return memo
    }, undefined)

    const hangedPlayerName = result[0]
    const hangedPlayer = gameInstance.players.find(p => p.name === hangedPlayerName)

    console.log(`${ hangedPlayer.name } was hanged!`)
    if (hangedPlayer.role === ROLE.MAFIA) {
      console.log('He was a really bat man')
    } else {
      console.log('He was innocent!')
    }

    hangedPlayer.alive = false

    const countsByRole = gameInstance.players.filter(p => p.alive).reduce((memo, p) => {
      if (p.role === ROLE.MAFIA) {
        memo.mafiaCount++
      } else if (p.role === ROLE.CITIZEN) {
        memo.citizensCount++
      }
      return memo
    }, { citizensCount: 0, mafiaCount: 0 })

    const { citizensCount, mafiaCount } = countsByRole

    if (mafiaCount >= citizensCount) {
      gameInstance.changeState(mafiaWon)
    } else if (mafiaCount <= 0) {
      gameInstance.changeState(citizensWon)
    } else {
      console.log('Players in game:')
      gameInstance.printAlivePlayers(gameInstance.players)

      gameInstance.changeState(night)
    }
  },
  exit: () => {
  },
}
