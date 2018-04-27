import pipe from './functional';

/**
 * @param  {String} s string de entrada
 * @return {String} s string de saída
 */

const removeAccents = (s) => {
  const i = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖŐòóôõöőÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜŰùúûüűÑñŠšŸÿýŽž'.split('');
  const o = 'AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUUuuuuuNnSsYyyZz'.split('');
  const map = {};
  i.forEach((el, idx) => { map[el] = o[idx]; });
  return s.replace(/[^A-Za-z0-9]/g, ch => map[ch] || ch);
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
  const headerCell = arr.shift(); // or arr[0];
  const headerCellKey = headerCell
    .map(item => pipe(removeAccents, toLowerCase, convertToCamel)(item));
  return (
    arr.reduce((prev, curr) => {
      const item = curr.reduce((previus, current, index) => {
        previus[headerCellKey[index]] = current || null; // current.replace(/(^-$)/, '')
        return previus;
      }, {});
      prev.push(item);
      return prev;
    }, [])
  );
};

export default csvToJson;
