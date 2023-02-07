import _ from 'lodash';

const stringify = (value, currentDepth, replacer = ' ', spacesCount = 2) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) return `${currentValue}`;
    const lines = Object.entries(currentValue)
      .map(([key, val]) => `${replacer.repeat(depth * spacesCount)}  ${key}: ${iter(val, depth + 2)}`);
    return ['{', ...lines, `${replacer.repeat(depth * spacesCount - spacesCount)}}`].join('\n');
  };
  return iter(value, currentDepth + spacesCount);
};

const stylish = (resultOfCompare, replacer = ' ', spacesCount = 2) => {
  const iter = (node, depth) => {
    const lines = node.map((item) => {
      const {
        name, status, children, oldValue, newValue,
      } = item;
      if (children.length > 0) {
        return `${replacer.repeat(spacesCount * depth)}  ${name}: ${iter(children, depth + 2)}`;
      }
      if (status === 'changed') {
        return `${replacer.repeat(spacesCount * depth)}- ${name}: ${stringify(oldValue, depth)}`
        + '\n'
        + `${replacer.repeat(spacesCount * depth)}+ ${name}: ${stringify(newValue, depth)}`;
      }
      if (status === 'added') {
        return `${replacer.repeat(spacesCount * depth)}+ ${name}: ${stringify(newValue, depth)}`;
      }
      if (status === 'removed') {
        return `${replacer.repeat(spacesCount * depth)}- ${name}: ${stringify(oldValue, depth)}`;
      }
      return `${replacer.repeat(spacesCount * depth)}  ${name}: ${stringify(oldValue, depth)}`;
    });
    return ['{', ...lines, `${replacer.repeat(spacesCount * depth - spacesCount)}}`].join('\n');
  };
  return iter(resultOfCompare, 1);
};

export default stylish;
