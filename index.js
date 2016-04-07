'use strict';

const http     = require('http');
const express  = require('express');
const socketIO = require('socket.io');
const ss       = require('socket.io-stream');

const app      = express();
const server   = http.Server(app);
const io       = socketIO(server);
const ONEYEAR  = 31557600000;

app.use(express.static('static', { maxAge : ONEYEAR }));

io.on('connection', socket => {

  const spawn   = require('child_process').spawn;
  const counter = spawn('./counter.sh'); // so redundant wat
  const stream  = ss.createStream();

  ss(socket).emit('p', stream);

  counter.stdout.pipe(stream);

});

server.listen(3000);

console.info('Truck server running on 3000');

