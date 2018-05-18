import get from './modules/getcsv';
import arrToJson from './modules/util';
import { curry } from './modules/functional';

const fileURL = `${URL}F.csv?id=10`;

const detectSeparator = (csv) => {
  const separators = [',', ';', '|', '\t'];
  const index = separators
    .map(item => csv.indexOf(item))
    .reduce((prev, curr) => {
      if (prev === -1 || (curr !== -1 && curr < prev)) {
        return curr;
      }
      return prev;
    });
  return csv[index];
};

const findNewLineSplit = (csv) => {
  const arr = csv.split(/\n/);
  if (arr[arr.length - 1] === '') {
    arr.pop();
  }
  return arr;
};

const csvToArr = (csv, fnSeparator, fnSplitLine) => {
  const separator = fnSeparator(csv);
  const arrLines = fnSplitLine(csv);
  const reg = new RegExp(`${separator}(?!\\s)`);
  return arrLines.map(item => item.split(reg));
};

const init = (csv) => {
  const arr = curry(csvToArr)(csv, detectSeparator, findNewLineSplit);
  const json = arrToJson(arr);
  console.log('json', json);
};

const initApp = () => {
  get(fileURL).then(init);
};

initApp();
