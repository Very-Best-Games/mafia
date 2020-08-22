import express from 'express'
// https://github.com/expressjs/morgan/issues/190
const morgan = require('morgan')

import { getAllLobbies, getLobbyById, addLobby, joinLobby } from './lobbies'

const PORT = 3000

const app = express()

app.use(morgan('tiny'))

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

// TODO change to POST and remove add
app.get('/lobbies-add', (req, res) => {
  res.json(addLobby())
})

// TODO change to POST
app.get('/lobbies/:lobbyId/:player', (req, res) => {
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
