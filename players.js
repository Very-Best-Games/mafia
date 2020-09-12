import { nanoid } from 'nanoid'
import { savePlayers, loadPlayers } from './persistence'

export class Player {
  constructor({ id } = { id: nanoid() }) {
    console.log('Creating a new player')
    console.log('Genered user:', id)
    this.id = id
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
  console.log('add new player')
  let player = new Player()
  console.log('added new player', player)
  players.push(player)

  savePlayers(players)

  return player
}