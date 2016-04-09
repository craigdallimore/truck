import { Bus, update } from 'baconjs';
import ss              from 'socket.io-stream';

import socket       from '../io';
import configStream from './config';

const dataStream = new Bus();

ss(socket).on('p', stream => {

  stream.on('data', d => {
    dataStream.push(d.toString());
  });

  stream.on('end', () => {
    dataStream.end();
  });

});


const initialState = {
  number   : 0,
  commands : []
};

const onConfig = (state, config) => {
  state.commands = config.commands;
  return state;
};

const onNumber = (state, n) => {
  state.number = n;
  return state;
};

const stateStream = update(initialState,
  [ configStream ], onConfig,
  [ dataStream ], onNumber
);

export default stateStream;
