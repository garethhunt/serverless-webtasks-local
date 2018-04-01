const test = require('tape');
const createRequestHandler = require('./requestHandler');

test('createRequestHandler returns a function', (t) => {
  t.plan(1);

  const requestHandler = createRequestHandler({});

  t.ok(typeof requestHandler === 'function');
  t.end();
});

test('requestHandler returns 404 status when fnHandlers is empty', (t) => {
  t.plan(1);

  let resStatus = 0;

  const mockReq = {
    url: 'http://localhost:3000/'
  }
  const mockRes = {
    end: () => {},
    writeHead: (status) => { resStatus = status; }
  }
  const requestHandler = createRequestHandler({});

  requestHandler(mockReq, mockRes);

  t.equals(resStatus, 404);
  t.end();
});

test('requestHandler executes a function for a matching path /foo', (t) => {
  t.plan(1);

  const fnHandlers = {
    'foo': () => { return 1; }
  }
  const mockReq = {
    url: 'http://localhost:3000/foo'
  };
  const requestHandler = createRequestHandler(fnHandlers);

  const result = requestHandler(mockReq, {});

  t.equal(result, 1);
  t.end();
});

test('requestHandler executes a function for a matching path /foo/bar', (t) => {
  t.plan(1);

  const fnHandlers = {
    'foo': () => { return 2; }
  }
  const mockReq = {
    url: 'http://localhost:3000/foo/bar'
  };
  const requestHandler = createRequestHandler(fnHandlers);

  const result = requestHandler(mockReq, {});

  t.equal(result, 2);
  t.end();
});
