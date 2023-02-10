import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const parse = (filepath) => {
  const extension = path.extname(filepath);
  switch (extension) {
    case '.json':
      return JSON.parse(fs.readFileSync(path.resolve(filepath)));
    case '.yml':
    case '.yaml':
      return yaml.load(fs.readFileSync(path.resolve(filepath)));
    default: throw new Error('Extension unsupported!');
  }
};

export default parse;
