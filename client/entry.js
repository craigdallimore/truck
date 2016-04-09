import runDOM       from './runDOM';
import stateStream  from './streams/state';
import Page         from './views/Page';

const pageStream = stateStream.map(Page);
const rootNode   = document.querySelector('#root');

runDOM(rootNode, pageStream).onValue();
