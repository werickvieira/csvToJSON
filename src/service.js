import { pipe } from './functional';
import { normalize, lowerCase, camelCase } from './util';

export default function service() {
  const detectSeparator = (csv) => {
    if (!csv) {
      return [];
    }
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
    if (!csv) {
      return [];
    }

    const arr = csv.split(/\n/);
    if (arr[arr.length - 1] === '') {
      arr.pop();
    }

    return arr;
  };

  const parseToObject = (arr) => {
    if (!Array.isArray(arr)) {
      throw new Error("Function didn't receive an array.");
    }

    const headerCell = arr.shift();
    const headerCellKey = headerCell
      .map(item => pipe(lowerCase, camelCase, normalize)(item));

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

  return {
    detectSeparator,
    splitLines,
    parseToObject,
  };
}
