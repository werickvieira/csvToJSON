import { pipe } from './functional';
import { normalize, lowerCase,  camelcase } from './util';

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

const splitLines = (csv) => {
  const arr = csv.split(/\n/);
  if (arr[arr.length - 1] === '') {
    arr.pop();
  }

  return arr;
};

const parseToObject = (arr) => {
  const headerCell = arr.shift();
  const headerCellKey = headerCell
    .map(item => pipe(normalize, lowerCase, camelcase)(item));

  return (
    arr.reduce((prev, curr) => {
      const item = curr.reduce((previus, current, index) => {
        previus[headerCellKey[index]] = current || null;
        return previus;
      }, {});
      prev.push(item);
      return prev;
    }, [])
  );
};

const csvToJSON = (csv) => {
  const separator = detectSeparator(csv);
  const csvLines = splitLines(csv);
  const reg = new RegExp(`${separator}(?!\\s)`);
  const lines = csvLines.map(item => item.split(reg));

  return parseToObject(lines);
};

export default csvToJSON;