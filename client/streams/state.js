import { update } from 'baconjs';
import { compose, view, set, flip, lensProp, toPairs } from 'ramda';

import configStream from './config';
import processStream from './process';

const commandLens  = lensProp('commands');
const numberLens   = lensProp('number');

const extractPairs = compose(toPairs, view(commandLens));

const initialState = {
  number   : 0,
  commands : []
};

const onConfig = (config, state) => {
  return set(commandLens, extractPairs(config), state);
};

const onNumber = set(numberLens);

const stateStream = update(initialState,
  [ configStream ], flip(onConfig),
  [ processStream ], flip(onNumber)
);

export default stateStream;
