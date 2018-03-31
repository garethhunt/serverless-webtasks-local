const test = require('tape');
const createRequestHandler = require('./requestHandler');

test('createRequestHandler returns a function', (t) => {
  t.plan(1);

  const requestHandler = createRequestHandler({});

  t.ok(typeof requestHandler === 'function');
  t.end();
});