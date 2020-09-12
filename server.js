import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
// https://github.com/expressjs/morgan/issues/190
import morgan from 'morgan'

import { getAllLobbies, getLobbyById, addLobby, joinLobby } from './lobbies'
import { getAllPlayers, getPlayerById, addPlayer } from './players'

const PORT = 3000
const app = express()
var expiryDateForSession = new Date( Date.now() + 24 * 60 * 60 * 1000 ); // 24 hours

app.use(morgan('tiny'))
app.set('trust proxy', 1)

app.use(cookieParser());
console.log('cockie parser')


app.use(session({
  secret: 'TheBestGameEver',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: true,
    httpOnly: true,
    path: '/',
    expires: expiryDateForSession
  }
}))
console.log('session set')

app.use(function (req,res,next) {
  if (req.session.user) {
    console.log('users session found.', req.session.user)
    next()
  } else {
    console.log('users session not found.')
    let newUser = addPlayer()
    req.session.user = newUser
    console.log('session user now', req.session.user, 'and session info', req.session, 'and session id', req.session.id)
    console.log('All users:', getAllPlayers())
    req.session.save()
    next()
  }
})

app.get('/', (req, res) => {
  console.log('in main', req.session.user)
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

app.get('/clean', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
          return res.send({ error: 'Logout error' })
      }
      return res.send({ 'clearSession': 'success' })
    })
  } else {
    console.log('Session was not found')
  }
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${ PORT }`)
})



function checkUserSession (req, res, next) {
  console.log('check', req.session.user, 'and session id', req.session.id)
  if (req.session.user) {
    console.log('users session found.')
    next()
  } else {
    console.log('users session not found.')
    let newUser = addPlayer()
    req.session.user = newUser
    console.log('session user now', req.session.user, 'and session info', req.session)
    console.log('All users:', getAllPlayers())
    req.session.save()
    next()
  }
}

