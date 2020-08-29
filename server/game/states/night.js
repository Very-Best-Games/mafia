import { randomArrayElement } from '../../utils/random'
import { CAUSE_OF_DEATH } from '../causes-of-death'
import { ROLE } from '../roles'
import { mafiaWon } from './mafia-won'
import { citizensWon } from './citizens-won'
import { day } from './day'

export const night = {
  enter: (gameInstance) => {
    console.log('Night')
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

    const murderedPlayerName = result[0]
    const murderedPlayer = gameInstance.players.find(p => p.name === murderedPlayerName)


    console.log(randomArrayElement(CAUSE_OF_DEATH)(murderedPlayer.name))

    murderedPlayer.alive = false

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

      gameInstance.changeState(day)
    }
  },
  exit: () => {
  },
}
