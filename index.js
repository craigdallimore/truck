'use strict';

const http    = require('http');
const express = require('express');
const app     = express();
const server  = http.Server(app);
const ONEYEAR = 31557600000;

app.use(express.static('w', { maxAge : ONEYEAR }));

server.listen(3000);
console.info('Truck server running on 3000');

//const spawn = require('child_process').spawn;

//const counter = spawn('./counter.sh'); // so redundant wat

//counter.stdout.on('data', data => {
  //console.log(`from child ${data}`);
//});
