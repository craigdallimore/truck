import ss from 'socket.io-stream';
import { mergeAll, Bus } from 'baconjs';
import { compose, map, keys, prop } from 'ramda';

import configStream from './config';
import socket       from '../io';

// :: String id -> EventStream
const idToProcessOutput = id => {

  const dataStream = new Bus();

  ss(socket).on(id, stream => {

    stream.on('data', d => {
      dataStream.push({ id, line : d.toString() });
    });

    stream.on('end', () => {
      dataStream.end();
    });

  });

  return dataStream;

};

// :: Obj commands -> EventStream
const configToProcessOutput = compose(
  mergeAll,
  map(idToProcessOutput),
  keys,
  prop('commands')
);

const processStream = configStream.flatMap(configToProcessOutput);

export default processStream;
