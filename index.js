const { TYPES } = require('./constants');

const pamt = mod => new Proxy(mod, {
  get: function (target, prop) {
    const fn = target[prop];

    if (typeof fn !== 'function') return fn;
    if (!fn.__pamt) return fn;

    return function pamtProxyGet(...params) {
      const err = params
        .map((it, i) => typeof it !== fn.__pamt[i] && new Error(`Invalid arg type of ${it}. It has to be ${fn.__pamt[i]}`))
        .find(it => it);

      if (err) throw err;

      return fn(...params);
    };
  }
});

const def = definitions => mod => {
  Object
    .keys(mod)
    .filter(it => typeof mod[it] === 'function') // TODO: use get
    .forEach((it) => {
      const definition = definitions[it];

      if (!definition) return;

      mod[it].__pamt = definition;
    });

  return pamt(mod);
};

module.exports = {
  def,
  TYPES
};
