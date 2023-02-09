import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const filepath1 = getFixturePath('file1.json');
const filepath2 = getFixturePath('file2.json');
const filepath3 = getFixturePath('file3.yml');
const filepath4 = getFixturePath('file4.yaml');

const pattern1 = readFile('pattern1.txt');
const pattern2 = readFile('pattern2.txt');
const pattern3 = readFile('pattern3.txt');

test('all sorts of objects', () => {
  expect(genDiff(filepath1, filepath2)).toEqual(pattern1);

  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(pattern2);

  expect(genDiff(filepath3, filepath4)).toEqual(pattern3);
});
