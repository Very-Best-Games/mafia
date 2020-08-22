import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
// https://github.com/expressjs/morgan/issues/190
const morgan = require('morgan')

import { getAllLobbies, getLobbyById, addLobby, joinLobby } from './lobbies'

const PORT = 3000

const app = express()

app.use(morgan('tiny'))

app.use(cookieParser());
app.use(function(req, res, next) {
  if (req.session.user) {
    next()
  } else {
    addPlayer()
    console.log(getAllPlayers())
  }
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
