const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
});

const port = 3000 || process.env.PORT;
const clients = {}; 

app.get('/', (req, res) => {
  res.send('index');
});

io.on('connection', socket => {
  socket.on('join', name => {
    console.log('Joined: ' + name);
    clients[clients.id] = name;
    clients.emit('update', 'connect server.');
    clients.broadcast.emit('update', name + ' has joined the server');
  });

  socket.on('send', msg => {
    console.log('Message: ' + msg);
    clients.broadcast.emit('chat', clients[clients.id], msg);
  });

  socket.on('disconnect', () => {
    console.log('Disconnect');
    io.emit('update', clients[clients.id] + ' has left the server');
    delete clients[clients.id];
  });
});

server.listen(port, () => {
  console.log('Server is Run');
});

