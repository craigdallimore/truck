import { fromNodeCallback } from 'baconjs';
import { readFile } from 'fs';
import path from 'path';

export default fromNodeCallback(
  readFile,
  path.join(__dirname, '../../config.json'),
  'utf8'
).toProperty().map(JSON.parse);

