const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: { origin: '*' }
});

const port = 3000 || process.env.PORT;

app.set('view engine', 'ejs');

app.get('/home', (req, res) => {
  res.render('home');
});

io.on('connection', (socket) => {
  console.log('Usuario connectado: ' + socket.id);

  socket.on('message', (data) => {
    socket.broadcast.emit('message', data);
  })
});

server.listen(port, () => {
  console.log('Server is Run');
});

