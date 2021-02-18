const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const PORT = process.env.POST;

app.use(express.static('public'));

server.listen(PORT, () => console.log(`server is up & running on port ${PORT}`));