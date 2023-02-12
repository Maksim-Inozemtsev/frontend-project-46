import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import buildTreeDiff from './comparator.js';
import formatter from './formatters/index.js';

const fileFormat = (filepath) => path.extname(filepath).slice(1);

const parser = (filepath, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(fs.readFileSync(path.resolve(filepath)));
    case 'yml':
    case 'yaml':
      return yaml.load(fs.readFileSync(path.resolve(filepath)));
    default: throw new Error('Extension unsupported!');
  }
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const sample1 = parser(filepath1, fileFormat(filepath1));
  const sample2 = parser(filepath2, fileFormat(filepath1));
  const result = buildTreeDiff(sample1, sample2);
  return formatter(result, formatName);
};

export default genDiff;
