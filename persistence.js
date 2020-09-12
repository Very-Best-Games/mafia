import fs from 'fs'

export const save = (data) => {
  fs.writeFileSync('./lobbies.json', JSON.stringify(data))
}

export const load = () => {
  return JSON.parse(fs.readFileSync('./lobbies.json'))
}

export const savePlayers = (data) => {
  fs.writeFileSync('./players.json', JSON.stringify(data))
}

export const loadPlayers = () => {
  return JSON.parse(fs.readFileSync('./players.json'))
}