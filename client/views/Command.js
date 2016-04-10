import h            from 'virtual-dom/h';
import actionStream from '../streams/action';

const START_CLICKED = 'START_CLICKED';
const STOP_CLICKED  = 'STOP_CLICKED';

const onStartClick = id => () => {
  actionStream.push({ action : START_CLICKED, id });
};

const onStopClick = id => () => {
  actionStream.push({ action : STOP_CLICKED, id });
};

const Line = line => {
  return h('li', { className : 'command__item__lines__item' }, line);
};

const Command = ([id, model]) => {
  return h(
    'li', { className : 'command__item' },
    [
      h('h3', {}, model.name),
      h('button', {
        'ev-click' : onStartClick(id)
      }, 'Start'),
      h('button', {
        'ev-click' : onStopClick(id)
      }, 'Stop'),
      h('span', { className : 'command__item__status'},
        model.status
      ),
      h('ul', { className : 'command__item__lines' },
        model.lines.map(Line)
      )
    ]
  );
};

export default Command;
