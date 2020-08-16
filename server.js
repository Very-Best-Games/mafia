// 1. Инициализировать сервер, чтобы слушал на каком-нибудь порту
// научиться запускать, останавливать
// Скопировать с сайта express https://expressjs.com/en/starter/hello-world.html
//
// const express = require('express')
// const app = express()
// const port = 3000
//
// app.get('/create-room', (req, res) => {
//   res.send('Hello World!')
// })
//
// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })

// 2. Определить api создания комнаты, дать ему url и сделать какую-то заглушку
//
// 3. В api создания комнаты вернуть id этой комнаты и сохранить на сервере что такая комната теперь есть
// Здесь будет массив всех комнат, изменяем его при обращении к этому API, храним просто в памяти
//
// 4. Добавить api показа всех существующих комнат
//
// 5. К этому моменту у нас есть id комнаты, например 123456
// Нужно сделать api /join-room/123456, которая будет назначать пользователю уникальный id и будет добавлять его в комнату
//
// 6. Показываем всех пользователей в комнатах

// node server.js


const express = require('express')
const app = express()
const port = 3000
const rooms = require('./ rooms');


// Homepage
app.get('/', (req, res) => {
    res.send('Hello to app');
})


// Список комнат
app.get('/all-rooms', (req, res) => {
  res.send(rooms.getAllRooms());
})


// Комната
app.get('/room/{id}', (req, res) => {
    res.send(rooms.getRoomById(id));
  })

app.get('/create-room', (req, res) => {
    res.send(rooms.addRoom());
})

app.get('/join-room/:room_id/:user_name', (req, res) => {
    res.send(rooms.join_room(req.params["room_id"], req.params["user_name"]))
})


//listener
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
