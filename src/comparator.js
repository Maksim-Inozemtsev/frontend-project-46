import _ from 'lodash';

const buildTreeDiff = (obj1, obj2) => {
  const sortedKeys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  return sortedKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      if (_.isObject(value1) && _.isObject(value2)) {
        return { name: key, status: 'nested', children: buildTreeDiff(value1, value2) };
      }
      if (value1 === value2) {
        return { name: key, status: 'unchanged', value: value1 };
      }
      return {
        name: key, status: 'changed', oldValue: value1, newValue: value2,
      };
    }
    if (Object.hasOwn(obj1, key)) {
      return { name: key, status: 'removed', oldValue: value1 };
    }
    return { name: key, status: 'added', newValue: value2 };
  });
};

export default buildTreeDiff;
