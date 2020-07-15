const normalize = (s) => {
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

const lowerCase = value => value.toLowerCase();

const camelcase = s => s.replace(/(\s\w)/g, m => m[1].toUpperCase());

export {
  normalize,
  lowerCase,
  camelcase,
};
