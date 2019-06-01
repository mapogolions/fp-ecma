'use strict';


const test = require('ava');
const { lens, view, set, map } = require('../../src/fun/lens-fp.js');


test('view a property value through lens', t => {
  const arrayLikeLens = lens('length');
  t.is(view(arrayLikeLens, new Array(2)), 2);
  t.is(view(arrayLikeLens, { length: 10 }), 10);
  t.is(view(arrayLikeLens, []), 0);
});

test('set a property value through lens', t => {
  const iterableLens = lens(Symbol.iterator);
  const mock = {};
  const another = set(iterableLens, function* () { yield 101 }, mock);
  for (const elem of another) {
    t.is(elem, 101);
  }
});

test('map property value to', t => {
  const httpStatusLens = lens('status');
  const ok = { status: 200 };
  const not_found = map(httpStatusLens, status => 404, ok);
  t.is(not_found.status, 404);
});