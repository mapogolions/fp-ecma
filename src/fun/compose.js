'use strict';

const compose = (g, f) => x => g(f(x));
const composeAsync = (g, f) => async x => g(await f(x));

const composeCps = (g, f) => (x, callback) => {
  f(x, (err, data) => {
    if (err) {
      callback(err);
      return;
    }
    g(data, callback);
  });
};


module.exports = { compose, composeAsync, composeCps };
