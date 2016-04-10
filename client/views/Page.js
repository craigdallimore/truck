import h           from 'virtual-dom/h';
import Command     from './Command';
import { toPairs } from 'ramda';

const Page = model => {
  return h(
    'section', { className : 'x' },
    [
      h('h2', {}, model.number),
      h('ul', { className : 'command__list' },
        toPairs(model.commands).map(Command)
      )
    ]
  );
};

export default Page;
