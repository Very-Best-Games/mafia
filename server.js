import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
// https://github.com/expressjs/morgan/issues/190
const morgan = require('morgan')

import { getAllLobbies, getLobbyById, addLobby, joinLobby } from './lobbies'
import { getAllPlayers, getPlayerById, addPlayer } from './players'

const PORT = 3000

const app = express()

app.use(morgan('tiny'))

app.use(cookieParser());
console.log('cockie parser')
app.use(session({
  secret: 'secret',
  name: 'mafia_game',
  resave: true,
  saveUninitialized: true
}))
console.log('secret')
app.use(function(req, res, next) {
  console.log(req.session.user)
  if (req.session.user) {
    console.log('users session found.')
    next()
  } else {
    console.log('users session not found.')
    addPlayer()
    console.log(getAllPlayers())
  }
})

app.get('/', (req, res) => {
  console.log('in main')
  res.json(getAllLobbies())
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
