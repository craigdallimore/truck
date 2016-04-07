import io from 'socket.io-client';
import ss from 'socket.io-stream';
import effect from './effect';
import { Bus, update } from 'baconjs';
import h from 'virtual-dom/h';

const socket = io.connect(location.href);

const dataStream = new Bus();

ss(socket).on('p', stream => {

  stream.on('data', d => {
    dataStream.push(d.toString());
  });

  stream.on('end', () => {
    dataStream.end();
  });

});

const initialState = { number : 0 };

const onNumber = (state, n) => {
  state.number = n;
  return state;
};

const stateStream = update(initialState,
  [ dataStream ], onNumber
);

const stateToVDOM = state => {
  return h('section', { className : 'x' }, state.number);
};

const stateStreamToVDOM = stateStream.map(stateToVDOM);

const rootNode = document.querySelector('#root');

effect(rootNode, stateStreamToVDOM).onValue();
