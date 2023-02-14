import _ from 'lodash';

const showValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return (typeof value === 'string') ? `'${value}'` : value;
};

const plain = (resultOfCompare) => {
  const iter = (node, path) => {
    const lines = node
      .filter((item) => item.status !== 'unchanged')
      .map((item) => {
        switch (item.status) {
          case 'nested':
            return iter(item.children, `${path}${item.name}.`);
          case 'changed':
            return `Property '${path}${item.name}' was updated. From ${showValue(item.oldValue, path)} to ${showValue(item.newValue, path)}`;
          case 'added':
            return `Property '${path}${item.name}' was added with value: ${showValue(item.newValue, path)}`;
          case 'removed':
            return `Property '${path}${item.name}' was removed`;
          default:
            return 'error';
        }
      });
    return [...lines].join('\n');
  };
  return iter(resultOfCompare, '');
};

export default plain;
