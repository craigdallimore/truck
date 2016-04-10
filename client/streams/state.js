import { update } from 'baconjs';
import {
  append,
  compose,
  curry,
  lensPath,
  lensProp,
  map,
  merge,
  over,
  pick,
  prop,
  propEq,
  set,
  view
} from 'ramda';

import configStream from './config';
import processStream from './process';
import actionStream from './action';

const actionPredicate = propEq('action');
const getId = prop('id');

const startActionStream = actionStream
  .filter(actionPredicate('START_CLICKED'))
  .map(getId);

const commandLens = lensProp('commands');

const initialState = {
  commands : {}
};

const addProps = merge({
  lines  : [],
  status : 'NOT_RUNNING'
});

// :: Object command -> Object model
const commandToModel = compose(addProps, pick(['name', 'onEnd', 'onRegex']));

// :: Object config -> Object models
const configToModels = compose(map(commandToModel), view(commandLens));

// :: Object state, Object config -> Object state
const setCommandModels = (state, config) => {
  return set(
    commandLens,
    configToModels(config),
    state
  );
};

// :: Object state, Object line -> Object state
const setLine = (state, { id, line }) => {
  return over(
    lensPath(['commands', id, 'lines']),
    append(line),
    state
  );
};

// :: String status, Object state, String id -> Object state
const setStatus = curry((status, state, id) => {
  return set(
    lensPath(['commands', id, 'status']),
    status,
    state
  );
});

const stateStream = update(initialState,
  [ startActionStream ], setStatus('RUNNING'),
  [ configStream ], setCommandModels,
  [ processStream ], setLine
);

export default stateStream;
