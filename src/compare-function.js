import _ from 'lodash';

const makeItem = (name, status, children = [], oldValue = '', newValue = '') => ({
  name,
  status,
  children,
  oldValue,
  newValue,
});

const compare = (obj1, obj2) => {
  const sortedKeys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  return sortedKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      if (_.isObject(value1) && _.isObject(value2)) {
        return makeItem(key, 'unchanged', compare(value1, value2), '', '');
      }
      if (value1 === value2) {
        return makeItem(key, 'unchanged', [], value1, value1);
      }
      return makeItem(key, 'changed', [], value1, value2);
    }
    if (Object.hasOwn(obj1, key)) {
      return makeItem(key, 'removed', [], value1, '');
    }
    if (Object.hasOwn(obj2, key)) {
      return makeItem(key, 'added', [], '', value2);
    }
    throw new Error("Something's wrong!");
  });
};

export default compare;
