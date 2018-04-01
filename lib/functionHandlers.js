const Runtime = require('webtask-runtime');

const configureFunctionHandlers = (serverless) => {
  const fnHandlers = {};

  const fnNames = serverless.service.getAllFunctions();

  fnNames.forEach((fnName) => {
    const wtfn = serverless.service.getFunction(fnName);
    const handler = require(serverless.config.servicePath + '/' + wtfn.handler);
    fnHandlers[wtfn.name] = Runtime.createHandler(handler, {});
  });

  return fnHandlers;
};

module.exports = configureFunctionHandlers;