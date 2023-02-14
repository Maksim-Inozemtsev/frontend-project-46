import _ from 'lodash';

const currentIndent = (depth, spacesCount = 4) => ' '.repeat(spacesCount * depth - 2);

const stringify = (value, depth) => {
  if (!_.isObject(value)) return `${value}`;
  const lines = Object.entries(value)
    .map(([key, val]) => `${currentIndent(depth + 1)}  ${key}: ${stringify(val, depth + 1)}`);
  return ['{', ...lines, `${currentIndent(depth)}  }`].join('\n');
};

const stylish = (resultOfCompare) => {
  const iter = (data, depth) => data.map((node) => {
    switch (node.status) {
      case 'nested':
        return `${currentIndent(depth)}  ${node.name}: {\n${iter(node.children, depth + 1).join('')}${currentIndent(depth)}  }\n`;
      case 'changed':
        return `${currentIndent(depth)}- ${node.name}: ${stringify(node.oldValue, depth)}\n`
        + `${currentIndent(depth)}+ ${node.name}: ${stringify(node.newValue, depth)}\n`;
      case 'added':
        return `${currentIndent(depth)}+ ${node.name}: ${stringify(node.newValue, depth)}\n`;
      case 'removed':
        return `${currentIndent(depth)}- ${node.name}: ${stringify(node.oldValue, depth)}\n`;
      default:
        return `${currentIndent(depth)}  ${node.name}: ${stringify(node.value, depth)}\n`;
    }
  });
  return `{\n${iter(resultOfCompare, 1).join('')}}`;
};

export default stylish;
