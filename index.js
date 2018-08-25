const { TYPES } = require('./constants');

const def = definitions => mod => new Proxy(mod, {
  get: function (target, prop) {
    const val = target[prop];
    const definition = definitions[prop];

    if (!definition || typeof val !== 'function') return val;

    return function pamtProxyGet(...params) {
      const err = params
        .map((it, i) => typeof it !== definition[i] && new Error(`Invalid arg type of ${it}. It has to be ${definition[i]}`))
        .find(it => it);

      if (err) throw err;

      return val(...params);
    };
  }
});

module.exports = {
  def,
  TYPES
};
