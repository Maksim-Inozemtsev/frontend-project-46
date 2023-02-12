import fs from 'fs';
import path from 'path';
import parser from './parser.js';
import buildTreeDiff from './comparator.js';
import formatter from './formatters/index.js';

const fileRead = (filepath) => fs.readFileSync(path.resolve(filepath));
const fileFormat = (filepath) => path.extname(filepath).slice(1);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const objOne = parser(fileRead(filepath1), fileFormat(filepath1));
  const objTwo = parser(fileRead(filepath2), fileFormat(filepath2));
  const result = buildTreeDiff(objOne, objTwo);
  return formatter(result, formatName);
};

export default genDiff;
