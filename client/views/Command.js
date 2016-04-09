import h            from 'virtual-dom/h';
import { compose }  from 'ramda';
import actionStream from '../streams/action';

const START_CLICKED = 'START_CLICKED';

const pushToStream = action => {
  actionStream.push(action);
};

const Command = model => {
  return h(
    'li', { className : 'command__item' },
    [
      h('h3', {}, model.name),
      h('button', {
        'ev-click' : compose(
          pushToStream,
          () => { return { action : START_CLICKED, model }; }
        )
      }, 'Start'),
      h('button', {}, 'Stop')
    ]
  );
};

export default Command;

