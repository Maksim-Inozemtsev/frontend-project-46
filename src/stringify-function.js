import _ from 'lodash';

const stringifyFunction = (value) => {
  const iter = (data, depth) => {
    const filler = '  ';
    if (!_.isObject(data)) {
      return `${data}`;
    }
    return `{\n${Object.entries(data).reduce((acc, el) => {
      if (!_.isObject(el[1])) {
        return `${acc}${filler.repeat(depth)}${el[0]}: ${el[1]}\n`;
      }
      return `${acc}${filler.repeat(depth)}${el[0]}: ${iter(el[1], depth + 1)}\n`;
    }, '')}${filler.repeat(depth - 1)}}`;
  };
  return iter(value, 1);
};

export default stringifyFunction;
