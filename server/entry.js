import ss             from 'socket.io-stream';
import { spawn }      from 'child_process';
import path           from 'path';

import server from './server';

import socketProp   from './properties/socket';
import configProp   from './properties/config';

import {
  startActionStream,
  stopActionStream
} from './streams/action';

// Share config with client ---------------------------------------------------
const emitConfig = (config, socket) => socket.emit('config', config);
configProp.sampledBy(socketProp, emitConfig).onValue();

// Handle actions from the client ---------------------------------------------

// :: Object command -> Process
const startProcess = ({ command, id }) => {
  return { id, proc : spawn(path.join(__dirname, '..', command)) };
};

// :: Object process, Object action
const stopProcess = ({ id, proc }, action) => {
  // TODO make this work.
  console.log('stopping process', id, action);
  proc.on('exit', () => {
    console.log('exit', proc.pid);
  });
  proc.kill();
};

// :: Property
const processProp = startActionStream.map(startProcess).toProperty();

// :: Object socket, Object process -> undefined
const pipeStdOut = (socket, { id, proc }) => {

  console.log(id);

  const stream  = ss.createStream();
  ss(socket).emit(id, stream);
  proc.stdout.pipe(stream);

};

processProp.sampledBy(stopActionStream, stopProcess).onValue();

socketProp.sampledBy(processProp, pipeStdOut).onValue();

// Start server ---------------------------------------------------------------
server.listen(3000);
console.info('Truck server running on http://localhost:3000');
