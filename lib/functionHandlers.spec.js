const mock = require('mock-require');
const test = require('tape');

test('configureFunctionHandlers returns an object', (t) => {
  t.plan(1);

  const configureFunctionHandlers = require('./functionHandlers');

  t.ok(typeof configureFunctionHandlers === 'function');
  t.end();
});

test('configureFunctionHandlers returns an empty object when serverless config has no functions', (t) => {
  t.plan(1);

  const serverlessMock = {
    service: {
      getAllFunctions: () => []
    }
  };
  const configureFunctionHandlers = require('./functionHandlers');

  const result = configureFunctionHandlers(serverlessMock);

  t.equal(Object.keys(result).length, 0);
  t.end();
});

test('configureFunctionHandlers returns a map of functions for configure functions', (t) => {
  t.plan(2);

  mock('/base/src/foo.js', () => {});

  const serverlessMock = {
    config: {
      servicePath: '/base'
    },
    service: {
      getAllFunctions: () => ['foo'],
      getFunction: (fnName) => {
        if (fnName === 'foo') {
          return {
            handler: 'src/foo.js',
            name: 'foo'

          };
        }
      }
    }
  };
  const configureFunctionHandlers = require('./functionHandlers');

  const result = configureFunctionHandlers(serverlessMock);

  t.ok(result.hasOwnProperty('foo'));
  t.ok(typeof result['foo'] === 'function');
  t.end();
});