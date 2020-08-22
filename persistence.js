import fs from 'fs'

export const save = (data) => {
  fs.writeFileSync('./lobbies.json', JSON.stringify(data))
}

export const load = () => {
  return JSON.parse(fs.readFileSync('./lobbies.json'))
}
