import diff      from 'virtual-dom/diff';
import patch     from 'virtual-dom/patch';
import Delegator from 'dom-delegator';

const delegator = new Delegator();

delegator.listenTo('click');

// :: DomNode node, EventStream virtualDomStream
// -> EventStream
// Note the Eventstream will need a subscriber.
export default (node, virtualDomStream) => virtualDomStream
  .diff(node, diff)
  .scan(node, patch);
