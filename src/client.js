'use strict';

const io = require('socket.io-client');
const ss = require('socket.io-stream');

const socket = io.connect(location.href);

ss(socket).on('p', stream => {

  stream.on('data', d => {

    console.log('d', d.toString());

  });

});

