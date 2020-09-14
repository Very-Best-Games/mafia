
export const savePlayers = (data) => {
  fs.writeFileSync('./sessions.json', JSON.stringify(data))
}

export const loadPlayers = () => {
  return JSON.parse(fs.readFileSync('./sessions.json'))
}
