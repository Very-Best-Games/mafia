import { nanoid } from 'nanoid'
import { save, load } from './persistence'

export class Lobby {
  constructor({ id, players } = { id: nanoid(), players: [] }) {
    this.id = id
    this.players = players
  }

  addPlayer(player) {
    this.players.push(player)

    save(lobbies)
  }
}

export const lobbies = load().map(lobbyData => new Lobby(lobbyData))

export const getAllLobbies = () => {
  return lobbies
}

export const getLobbyById = (id) => {
  return lobbies.find(lobby => lobby.id === id)
}

export const addLobby = () => {
  let lobby = new Lobby()
  lobbies.push(lobby)

  save(lobbies)

  return lobby
}

export function joinLobby(id, player) {
  const lobby = getLobbyById(id)
  if (lobby) {
    lobby.addPlayer(player)
    return lobby
  }
  return null
}

