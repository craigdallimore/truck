import { Bus, update } from 'baconjs';
import { toPairs }     from 'ramda';
import ss              from 'socket.io-stream';

import socket       from '../io';
import configStream from './config';

const dataStream = new Bus();

ss(socket).on('p', stream => {

  console.log('p', stream);

  stream.on('data', d => {
    console.log('d', d);
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
  state.commands = toPairs(config.commands);
  return state;
};

const onNumber = (state, n) => {
  console.log(n);
  state.number = n;
  return state;
};

const stateStream = update(initialState,
  [ configStream ], onConfig,
  [ dataStream ], onNumber
);

export default stateStream;
