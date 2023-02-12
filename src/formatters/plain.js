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
        const {
          name, status, oldValue, newValue, children,
        } = item;
        switch (status) {
          case 'nested':
            return iter(children, `${path}${name}.`);
          case 'changed':
            return `Property '${path}${name}' was updated. From ${showValue(oldValue, path)} to ${showValue(newValue, path)}`;
          case 'added':
            return `Property '${path}${name}' was added with value: ${showValue(newValue, path)}`;
          case 'removed':
            return `Property '${path}${name}' was removed`;
          default:
            return 'error';
        }
      });
    return [...lines].join('\n');
  };
  return iter(resultOfCompare, '');
};

export default plain;
