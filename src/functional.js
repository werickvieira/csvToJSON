const pipe = (...fns) => x => fns.reduce((prev, func) => func(prev), x);

const curry = (fn, ...args) => (
  args.length === fn.length ? fn(...args) : curry.bind(this, fn, ...args)
);

export {
  pipe,
  curry,
};
