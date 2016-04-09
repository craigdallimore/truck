import socket from '../io';
import { Bus } from 'baconjs';

const configStream = new Bus();

socket.on('config', config => {
  configStream.push(config);
});

export default configStream;
