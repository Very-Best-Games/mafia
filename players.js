import { nanoid } from 'nanoid'
import { savePlayers, loadPlayers } from './persistence'

export class Player {
    constructor({ id } = { id: nanoid(), name: '' }) {
      this.id = id
      this.name = name
    }
}

export const players = loadPlayers().map(playerData => new Player(playerData))

export const getAllPlayers = () => {
  return players
}

export const getPlayerById = (id) => {
  return players.find(player => player.id === id)
}

export const addPlayer = () => {
  let player = new Player()
  players.push(player)

  savePlayers(players)

  return player
}