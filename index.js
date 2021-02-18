const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { exec } = require('child_process');

const PORT = process.env.PORT || 8000;
let Users = [];

app.use(express.static('client/build'));
app.use(express.static('public'));

io.on('connection', socket => {
  const { id } = socket;
  let User = null;

  socket.on('register', req => {
    const { username } = req;
    if (Users.find(o => o.username === username)) {
      socket.emit('registered', { message: `${username} is not available.` });
    } else {
      User = { id, username };
      Users.push(User);
      socket.emit('registered', { User });
    }
  });

});

server.listen(PORT, () => {
  console.log(`server is up & running on port ${PORT}.`);
  if (process.env.NODE_ENV !== 'development') {
    exec('npm install --prefix client', err => console.log(err ? 'error in building react application.' : 'react application is up & running.'));
  }
});