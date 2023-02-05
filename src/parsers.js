import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const parse = (filepath) => {
  const extension = path.extname(filepath);
  let result;
  switch (extension) {
    case '.json':
      result = JSON.parse(fs.readFileSync(path.resolve(filepath)));
      return result;
    case '.yml':
    case '.yaml':
      result = yaml.load(fs.readFileSync(path.resolve(filepath)));
      return result;
    default: throw new Error('Extension unsupported!');
  }
};

export default parse;
