import get from './modules/getcsv';
import csvToJson from './modules/util';

const fileURL = `${URL}A.csv?id=10`;

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

const csvHandler = (data) => {
  const separator = detectSeparator(data);
  const arr = data.split(/\n/);
  if (arr[arr.length - 1] === '') {
    arr.pop();
  }
  try {
    console.log('arr', arr);
    const newArr = arr.map(item => item.split(separator));
    const response = csvToJson(newArr);
    console.log('arr', newArr);
    console.log('a', response);
  } catch (e) {
    console.log('e', e);
  }
};

const initApp = () => {
  get(fileURL).then(csvHandler);
};

initApp();
