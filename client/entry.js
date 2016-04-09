import runDOM       from './runDOM';
import stateStream  from './streams/state';
import actionStream from './streams/action';
import Page         from './views/Page';
import socket       from './io';

const pageStream = stateStream.map(Page);
const rootNode   = document.querySelector('#root');

// Subscribe to page updates.
pageStream.onValue();

// Subscribe to DOM updates.
runDOM(rootNode, pageStream).onValue();

actionStream.onValue(action => {
  console.log('action', action);
  socket.emit('action', action);
});
