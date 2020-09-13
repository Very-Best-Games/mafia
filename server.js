import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
// https://github.com/expressjs/morgan/issues/190
import morgan from 'morgan'

import { getAllLobbies, getLobbyById, addLobby, joinLobby } from './lobbies'
import { getAllPlayers, getPlayerById, addPlayer } from './players'

const PORT = 3000
const app = express()
var FileStore = require('session-file-store')(session);
var fileStoreOptions = {};

app.use(morgan('tiny'))
app.set('trust proxy', 1)

app.use(cookieParser());
console.log('coockie parser')


app.use(session({
  secret: 'TheBestGameEver',
  store: new FileStore(fileStoreOptions),
}))
console.log('session set')

app.get('/', (req, res) => {
  console.log('in main', req.session.id)
  const player = getPlayerById(req.session.id)
  console.log(player)

  if (player) {
    console.log('users session found.', req.session.id)
    console.log('All users:', getAllPlayers())
  } else {
    console.log('users session not found.')
    addPlayer(req.session.id)
    console.log('All users:', getAllPlayers())
  }
  
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


