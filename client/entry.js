import Delegator    from 'dom-delegator';

import runDOM       from './runDOM';
import stateStream  from './streams/state';
import actionStream from './streams/action';
import Page         from './views/Page';
import socket       from './io';

const pageStream = stateStream.map(Page);
const rootNode   = document.querySelector('#root');

runDOM(rootNode, pageStream).onValue();

const delegator = new Delegator();
delegator.listenTo('click');

actionStream.onValue(action => {
  console.log('action', action);
  socket.emit('action', action);
});
