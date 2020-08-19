// lobby
// day
// night
// end

import { randomArrayElement } from './utils/random'

const ROLE = {
  CITIZEN: 'CITIZEN',
  MAFIA: 'MAFIA',
}

const CAUSE_OF_DEAD = [
  (playerName) => `${playerName} was eaten by a terrifying black ram! 🐏`,
  (playerName) => `${playerName} was poisoned!`,
  (playerName) => `${playerName} was found at the bottom of the river!`
]

const printAlivePlayers = (players) => {
  console.log(players.filter(p => p.alive).map(p => p.name).join(', '))
}

const states = {
  lobby: {
    onEnter: () => {
      console.log('lobby')
    },
    update: (gameInstance, someData) => {
      if (someData.players) {
        gameInstance.players = players
        console.log('All players set:')
        printAlivePlayers(gameInstance.players)
        gameInstance.changeState(states.day)
      }
    }
  },
  day: {
    onEnter: (gameInstance) => {
      gameInstance.dayNumber++
      console.log(`Day number ${gameInstance.dayNumber}`)
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

      console.log(`${hangedPlayer.name} was hanged!`)
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
        gameInstance.changeState(states.mafiaWon)
      } else if (mafiaCount <= 0) {
        gameInstance.changeState(states.citizensWon)
      } else {
        console.log('Players in game:')
        printAlivePlayers(gameInstance.players)

        gameInstance.changeState(states.night)
      }
    }
  },
  night: {
    onEnter: (gameInstance) => {
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


      console.log(randomArrayElement(CAUSE_OF_DEAD)(murderedPlayer.name))

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
        gameInstance.changeState(states.mafiaWon)
      } else if (mafiaCount <= 0) {
        gameInstance.changeState(states.citizensWon)
      } else {
        console.log('Players in game:')
        printAlivePlayers(gameInstance.players)

        gameInstance.changeState(states.day)
      }
    }
  },
  mafiaWon: {
    onEnter: () => {
      console.log('😈 Mafia won 😈')
      console.log('Winners:')
      printAlivePlayers(players.filter(p => p.alive && p.role === ROLE.MAFIA))
    },
    update: (gameInstance, someData) => {
    }
  },
  citizenWon: {
    onEnter: () => {
      console.log('😇 Citizens won 😇')
      console.log('Winners:')
      printAlivePlayers(players.filter(p => p.alive && p.role === ROLE.CITIZEN))
    },
    update: (gameInstance, someData) => {
    }
  },
}

const game = {
  dayNumber: 0,
  players: undefined,
  currentState: undefined,
  changeState: (newState) => {
    game.currentState = newState
    game.currentState.onEnter(game)
  },
  start: () => {
    game.changeState(states.lobby)
  },
  update: (someData) => {
    game.currentState.update(game, someData)
  }
}

game.start()






const players = [
  {
    name: 'Player1',
    role: ROLE.CITIZEN,
    alive: true,
  },
  {
    name: 'Player2',
    role: ROLE.CITIZEN,
    alive: true,
  },
  {
    name: 'Player3',
    role: ROLE.CITIZEN,
    alive: true,
  },
  {
    name: 'Player4',
    role: ROLE.CITIZEN,
    alive: true,
  },
  {
    name: 'Player5',
    role: ROLE.CITIZEN,
    alive: true,
  },
  {
    name: 'Player6',
    role: ROLE.CITIZEN,
    alive: true,
  },
  {
    name: 'Mafia1',
    role: ROLE.MAFIA,
    alive: true,
  },
  {
    name: 'Mafia2',
    role: ROLE.MAFIA,
    alive: true,
  },
]

game.update({ players })

const citizenVoteDay1 = {
  Player1: 'Player2',
  Player2: 'Player3',
  Player3: 'Player2',
  Player4: 'Player2',
  Player5: 'Player4',
  Player6: 'Player4',
  Mafia1: 'Player4',
  Mafia2: 'Player4',
}

game.update({ vote: citizenVoteDay1 })

const mafiaVoteNight1 = {
  Mafia1: 'Player2',
  Mafia2: 'Player2',
}

game.update({ vote: mafiaVoteNight1 })

const citizenVoteDay2 = {
  Player1: 'Mafia1',
  Player3: 'Mafia1',
  Player5: 'Mafia1',
  Player6: 'Mafia1',
  Mafia1: 'Player6',
  Mafia2: 'Player6',
}

game.update({ vote: citizenVoteDay2 })

const mafiaVoteNight2 = {
  Mafia2: 'Player6',
}

game.update({ vote: mafiaVoteNight2 })

const citizenVoteDay3 = {
  Player1: 'Player3',
  Player3: 'Player1',
  Player5: 'Player1',
  Mafia2: 'Player1',
}

game.update({ vote: citizenVoteDay3 })

const mafiaVoteNight3 = {
  Mafia2: 'Player5',
}

game.update({ vote: mafiaVoteNight3 })


const citizenVoteDay4 = {
  Player3: 'Mafia2',
  Mafia2: 'Player3',
}

game.update({ vote: citizenVoteDay4 })
