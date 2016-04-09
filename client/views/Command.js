import h            from 'virtual-dom/h';
import actionStream from '../streams/action';

const START_CLICKED = 'START_CLICKED';

const onStartClick = id => () => {
  actionStream.push({ action : START_CLICKED, id });
};

const Command = ([id, model]) => {
  return h(
    'li', { className : 'command__item' },
    [
      h('h3', {}, model.name),
      h('button', {
        'ev-click' : onStartClick(id)
      }, 'Start'),
      h('button', {}, 'Stop')
    ]
  );
};

export default Command;

