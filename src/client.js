'use strict';

const io = require('socket.io-client');
const ss = require('socket.io-stream');

const socket = io.connect(location.href);

// What next?
// Lets get
// virtual-dom
// baconjs
//
// -------------------------------------------------
// On connection, receive the config.
// For each command show the name and a button.
// When the button is clicked, invoke the associated process
// and show the output.
// - Consider reconnection!
// - Consider closing processes!
// --------------------------------------------------

ss(socket).on('p', stream => {

  stream.on('data', d => {

    console.log('d', d.toString());

  });

  stream.on('end', () => {

    console.log('Ended');

  });

});

