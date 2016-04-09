import { propEq, prop, merge } from 'ramda';

import clientActionStream from './clientAction';
import configProp         from '../properties/config';

// :: String -> Boolean
const actionPredicate = propEq('action');

// :: Obj -> Any
const getId = prop('id');

// :: Obj -> Any
const getCommands = prop('commands');

// :: Obj, String -> Obj
const mergeInId = (obj, id) => merge(obj[id], { id });

const startClickedStream = clientActionStream
  .filter(actionPredicate('START_CLICKED'))
  .map(getId);

const stopClickedStream = clientActionStream
  .filter(actionPredicate('STOP_CLICKED'))
  .map(getId);

const commandsProp = configProp.map(getCommands);

export const startActionStream = commandsProp.sampledBy(startClickedStream, mergeInId);
export const stopActionStream  = commandsProp.sampledBy(stopClickedStream, mergeInId);
