import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (data, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    default:
      throw new Error(`Format '${formatName}' is NOT supported`);
  }
};

export default formatter;
