import _ from 'lodash';

const showValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return (typeof value === 'string') ? `'${value}'` : value;
};

const plain = (resultOfCompare) => {
  const iter = (node, path) => {
    const lines = node.map((item) => {
      const {
        name, status, oldValue, newValue, children,
      } = item;
      if (status === 'nested') {
        return iter(children, `${path}${name}.`);
      }
      if (status === 'changed') {
        return `Property '${path}${name}' was updated. From ${showValue(oldValue, path)} to ${showValue(newValue, path)}`;
      }
      if (status === 'added') {
        return `Property '${path}${name}' was added with value: ${showValue(newValue, path)}`;
      }
      if (status === 'removed') {
        return `Property '${path}${name}' was removed`;
      }
      return 'error';
    })
      .filter((el) => el !== 'error');
    return [...lines].join('\n');
  };
  return iter(resultOfCompare, '');
};

export default plain;
