import fs from 'fs';
import path from 'path';
import compare from './compare-function.js';
import stringifyFunction from './stringify-function.js';

const genDiff = (filepath1, filepath2) => {
  const sample1 = JSON.parse(fs.readFileSync(path.resolve(filepath1)));
  const sample2 = JSON.parse(fs.readFileSync(path.resolve(filepath2)));
  const result = compare(sample1, sample2);
  const string = stringifyFunction(result);
  console.log(string);
  return string;
};

export default genDiff;
