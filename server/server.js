import express from 'express'
import path from 'path'
// https://github.com/expressjs/morgan/issues/190
const morgan = require('morgan')

import { getAllLobbies, getLobbyById, addLobby, joinLobby } from './lobbies'

const PORT = 3000

const app = express()

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'public'))
app.use(express.static(path.join(__dirname, 'public')))

app.use(morgan('tiny'))

app.get('/', (req, res) => {
  res.render('./index.pug', { lobbies: getAllLobbies() })
})

app.get('/lobbies', (req, res) => {
  res.json(getAllLobbies())
})

app.get('/lobbies/:lobbyId', (req, res) => {
  const id = req.params.lobbyId
  const lobby = getLobbyById(id)
  if (lobby) {
    res.json(lobby)
  } else {
    res.sendStatus(404)
  }
})

app.post('/lobbies', (req, res) => {
  res.json(addLobby())
})

app.post('/lobbies/:lobbyId/:player', (req, res) => {
  const lobbyId = req.params.lobbyId
  const player = req.params.player

  const lobby = joinLobby(lobbyId, player)
  if (lobby) {
    res.json(lobby)
  } else {
    res.sendStatus(404)
  }
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${ PORT }`)
})
