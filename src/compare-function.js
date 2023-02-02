import _ from 'lodash';

const compare = (obj1, obj2) => {
  const keys = _.sortBy(Object.keys({ ...obj1, ...obj2 }));
  return keys.reduce((acc, key) => {
    if (!Object.hasOwn(obj1, key)) {
      acc[`+ ${key}`] = obj2[key];
    } else if (!Object.hasOwn(obj2, key)) {
      acc[`- ${key}`] = obj1[key];
    } else if (obj1[key] !== obj2[key]) {
      acc[`- ${key}`] = obj1[key];
      acc[`+ ${key}`] = obj2[key];
    } else {
      acc[`  ${key}`] = obj1[key];
    }
    return acc;
  }, {});
};

export default compare;
