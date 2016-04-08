import socket from '../io';
import { Bus } from 'baconjs';
import ss from 'socket.io-stream';

const configStream = new Bus();

ss(socket).on('config', stream => {

  stream.on('data', d => {
    configStream.push(d.toString());
  });

  stream.on('end', () => {
    configStream.end();
  });

});

export default configStream;
