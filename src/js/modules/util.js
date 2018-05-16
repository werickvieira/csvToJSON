import { pipe } from './functional';

/**
 * @param  {String} s string de entrada
 * @return {String} s string de saída
 */

const removeAccents = (s) => {
  const i = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖŐòóôõöőÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜŰùúûüűÑñŠšŸÿýŽž';
  const o = 'AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUUuuuuuNnSsYyyZz';
  return (
    s.split('').map((letter) => {
      const index = i.indexOf(letter);
      if (index !== -1) {
        return o[index];
      }
      return letter;
    }).join('')
  );
};


/**
 * Retorna uma string com os caracteres em caixa baixa
 * @param  {String} value é a string de entrada
 * @return {String} value é a string de saída
 */

const toLowerCase = value => value.toLowerCase();

/**
 *
 */

const convertToCamel = s => s.replace(/(\s\w)/g, m => m[1].toUpperCase());

/**
 * Retorna um array de objetos
 * @param  {Array} arr elementos linha a linha
 * @return {Array} array de objetos
 */

const csvToJson = (arr) => {
  const headerCell = arr.shift();
  const headerCellKey = headerCell
    .map(item => pipe(removeAccents, toLowerCase, convertToCamel)(item));
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

export default csvToJson;
