import ss                 from 'socket.io-stream';
import { flip, prop }     from 'ramda';
import { spawn }          from 'child_process';
import path from 'path';

import server             from './server';

import clientActionStream from './streams/clientAction';
import socketProp         from './properties/socket';
import configProp         from './properties/configProp';

const emitConfig = (config, socket) => socket.emit('config', config);

configProp.sampledBy(socketProp, emitConfig).onValue();

const startClickedPredicate = ({ action }) => action === 'START_CLICKED';

const startClickedStream = clientActionStream
  .filter(startClickedPredicate)
  .map('.id');

const commandsProp = configProp.map('.commands');

const commandStream = commandsProp.sampledBy(startClickedStream, flip(prop));

socketProp.sampledBy(commandStream, (socket, { command, name }) => {

  const commpath = path.join(__dirname, '..', command);
  console.log(`Starting command: ${name}, ${commpath}`);

  const counter = spawn(commpath);
  const stream  = ss.createStream();

  counter.on('error', err => { console.log(err); });
  counter.on('exit', () => { console.log('exit'); });
  counter.on('close', () => { console.log('close'); });

  counter.stdout.on('data', d => {
    console.log('d',d);
  });

  ss(socket).emit('p', stream);

  counter.stdout.pipe(stream);

}).onValue();

server.listen(3000);

console.info('Truck server running on 3000');
