import get from './modules/getcsv';
import csvToJson from './modules/util';

const fileURL = `${URL}A.csv?id=10`;
const fieldDelimiter = ';';

const csvHandler = (data) => {
  const arr = data.split(/\n/);
  if (arr[arr.length - 1] === '') {
    arr.pop();
  }
  try {
    const newArr = arr.map(item => item.split(fieldDelimiter));
    const response = csvToJson(newArr);
    console.log('a', response);
  } catch (e) {
    console.log('e', e);
  }
};

const initApp = () => {
  get(fileURL).then(csvHandler);
};

initApp();
