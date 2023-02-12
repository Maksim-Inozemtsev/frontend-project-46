import _ from 'lodash';

const currentIndent = (depth, spacesCount = 2) => ' '.repeat(spacesCount * depth);

const stringify = (value, depth, depthStep) => {
  const currentDepth = depth + depthStep;
  if (!_.isObject(value)) return `${value}`;
  const lines = Object.entries(value)
    .map(([key, val]) => `${currentIndent(currentDepth)}  ${key}: ${stringify(val, currentDepth, depthStep)}`);
  return ['{', ...lines, `${currentIndent(currentDepth - 1)}}`].join('\n');
};

const stylish = (resultOfCompare) => {
  const iter = (data, depth, depthStep = 2) => {
    const lines = data.map((node) => {
      const {
        name, status, oldValue, newValue, children,
      } = node;
      switch (status) {
        case 'nested':
          return `${currentIndent(depth)}  ${name}: ${iter(children, depth + depthStep)}`;
        case 'changed':
          return `${currentIndent(depth)}- ${name}: ${stringify(oldValue, depth, depthStep)}`
          + '\n'
          + `${currentIndent(depth)}+ ${name}: ${stringify(newValue, depth, depthStep)}`;
        case 'added':
          return `${currentIndent(depth)}+ ${name}: ${stringify(newValue, depth, depthStep)}`;
        case 'removed':
          return `${currentIndent(depth)}- ${name}: ${stringify(oldValue, depth, depthStep)}`;
        default:
          return `${currentIndent(depth)}  ${name}: ${stringify(oldValue, depth, depthStep)}`;
      }
    });
    return ['{', ...lines, `${currentIndent(depth - 1)}}`].join('\n');
  };
  return iter(resultOfCompare, 1);
};

export default stylish;
