import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';

// :: DomNode node, EventStream virtualDomStream
// -> EventStream
// Note the Eventsream will need a subscriber.
export default (node, virtualDomStream) => virtualDomStream
  .diff(node, diff)
  .scan(node, patch);
