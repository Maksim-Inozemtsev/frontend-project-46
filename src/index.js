import parse from './parsers.js';
import compare from './compare-function.js';
import formatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const sample1 = parse(filepath1);
  const sample2 = parse(filepath2);
  const result = compare(sample1, sample2);
  return formatter(result, formatName);
};

export default genDiff;
