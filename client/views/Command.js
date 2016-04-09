import h from 'virtual-dom/h';

const Command = model => {
  console.log(model);
  return h(
    'li', { className : 'command__item' },
    [
      h('h3', {}, model.name)
    ]
  );
};

export default Command;

