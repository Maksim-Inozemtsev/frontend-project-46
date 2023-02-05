import parse from './parsers.js';
import compare from './compare-function.js';
import stringifyFunction from './stringify-function.js';

const genDiff = (filepath1, filepath2) => {
  const sample1 = parse(filepath1);
  const sample2 = parse(filepath2);
  const result = compare(sample1, sample2);
  const string = stringifyFunction(result);
  console.log(string);
  return string;
};

export default genDiff;
