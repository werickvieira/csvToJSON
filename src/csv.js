/**
 * @param {string} str
 * @param {object} service
 */

const csvToJSON = (str, service) => {
  if (typeof (str) !== 'string') {
    throw new Error("Function didn't receive a string file.");
  }

  if (!service || Object.keys(service).length === 0) {
    throw new Error('Function missing dependency.');
  }

  const separator = service.detectSeparator(str);
  const csvLines = service.splitLines(str);
  const reg = new RegExp(`${separator}(?!\\s)`);
  const lines = csvLines.map(item => item.split(reg));

  return service.parseToObject(lines);
};

export default csvToJSON;
