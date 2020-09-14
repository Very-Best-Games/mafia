import fs from 'fs'
import path from 'path'

export const save = (data) => {
  fs.writeFileSync(path.resolve(__dirname, './lobbies.json'), JSON.stringify(data))
}

export const load = () => {
  return JSON.parse(fs.readFileSync(path.resolve(__dirname, './lobbies.json')))
}
