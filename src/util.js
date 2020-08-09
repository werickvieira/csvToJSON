const normalize = s => (
  s.normalize('NFD')
    .replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')
);

const lowerCase = value => value.toLowerCase();

const camelCase = s => s.replace(/(\s\w)/g, m => m[1].toUpperCase());

export {
  normalize,
  lowerCase,
  camelCase,
};
