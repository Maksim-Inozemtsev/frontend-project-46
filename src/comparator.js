import _ from 'lodash';

const makeItem = (name, status, oldValue = '', newValue = '', children = []) => ({
  name,
  status,
  oldValue,
  newValue,
  children,
});

const buildTreeDiff = (obj1, obj2) => {
  const sortedKeys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  return sortedKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      if (_.isObject(value1) && _.isObject(value2)) {
        return makeItem(key, 'nested', '', '', buildTreeDiff(value1, value2));
      }
      if (value1 === value2) {
        return makeItem(key, 'unchanged', value1, value1);
      }
      return makeItem(key, 'changed', value1, value2);
    }
    if (Object.hasOwn(obj1, key)) {
      return makeItem(key, 'removed', value1, '');
    }
    return makeItem(key, 'added', '', value2);
  });
};

export default buildTreeDiff;
