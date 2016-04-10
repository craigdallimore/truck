import { update } from 'baconjs';
import { compose, view, set, flip, lensProp, toPairs } from 'ramda';

import configStream from './config';
import processStream from './process';

const commandLens  = lensProp('commands');
//const numberLens   = lensProp('number');

const extractPairs = compose(toPairs, view(commandLens));

const initialState = {
  number   : 0,
  commands : []
};

// :: Object config, Object state -> Object state
const onConfig = (config, state) => set(commandLens, extractPairs(config), state);

// :: Number, Object State -> Object state
//const onNumber = set(numberLens);

// :: Object line, Object state -> Object state
const onLine = (line, state) => {

  console.log(line);
  return state;

};

const stateStream = update(initialState,
  [ configStream ], flip(onConfig),
  [ processStream ], flip(onLine)
  //[ processStream ], flip(onNumber)
);

export default stateStream;
