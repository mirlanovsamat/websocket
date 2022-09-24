const express = require('express');
const app = express()
const http = require('http').createServer(app);
const ws = require('socket.io')(http);
const { join } = require('path');
const cors = require("cors")
const host = 'localhost'
const port = 3000
let clients = []

app.use(cors({origin: '*'}))
ws.on('connection', (socket) => {
    console.log(`Client with id ${socket.id} connected`)
    ws.emit('whenConnected', `Client with id ${socket.id} connected`)
    clients.push(socket.id)
 
    socket.on('msgToServer', (message) =>
      ws.emit('msgToClient', message)
    )
  
    socket.on('disconnect', () => {
      clients.splice(clients.indexOf(socket.id), 1)
      console.log(`Client with id ${socket.id} disconnected`)
    })
})  



app.use(express.static(join(__dirname, 'static')));
app.get('/api', (req, res) => {
  res.send('balblabla')
})

http.listen(port, host, () => console.log(`Server listens http://${host}:${port}`))
