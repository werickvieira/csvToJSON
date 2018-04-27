const pipe = (...fns) => x => fns.reduce((prev, func) => func(prev), x);

export default pipe;
