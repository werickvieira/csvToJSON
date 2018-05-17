import get from './modules/getcsv';
import csvToJson from './modules/util';
// import { pipe, curry } from './modules/functional';

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

const csvHandler = (data, fn) => {
  const separator = fn(data);
  const arr = data.split(/\n/);
  if (arr[arr.length - 1] === '') {
    arr.pop();
  }
  try {
    const reg = new RegExp(`${separator}(?!\\s)`);
    return arr.map(item => item.split(reg));
  } catch (err) {
    console.log('e', err);
    return err;
  }
};

const init = (csv) => {
  const response = csvHandler(csv, detectSeparator);
  const json = csvToJson(response);
  console.log('json', json);
};

const initApp = () => {
  get(fileURL).then(init);
};

initApp();
