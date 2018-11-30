// currying
const toArray = args => [].slice.call(args);
export const autocurry = fn => {
  var len = fn.length;
  var args = [];
  return function next() {
    args = args.concat(toArray(arguments));
    return args.length >= len ? fn.apply(this, args.splice(0)) : next;
  };
};

// Array manipulation
export const map = autocurry((f, arr) => arr.map(f));
export const mapP = f => arr => Promise.all(arr.map(f));
export const filter = f => arr => arr.filter(f);
export const reduce = (f, iv) => arr => arr.reduce(f, iv);
export const sort = f => arr => arr.sort(f);
export const group = f =>
  compose(
    Object.entries,
    reduce(
      (map, item) => ({
        ...map,
        [f(item)]: [...(map[f(item)] || []), item]
      }),
      {}
    )
  );

// Function composition
export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
export const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
export const composeM = chainMethod => (...ms) =>
  ms.reduce((f, g) => x => {
    const y = g(x);
    return y[chainMethod] ? y[chainMethod](f) : f(y);
  });
export const composeP = composeM("then");

// Loging, diagnostic
export const trace = key => input => {
  console.log(key, input);
  return input;
};
