'use strict';

const http = require('http');
const Runtime = require('webtask-runtime');
const createRequestHander = require('./requestHandler');

class WebtasksLocal {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options || {};
    this.provider = this.serverless.getProvider('webtasks');

    this.commands = {
      'wt-local': {
        usage: 'Run your webtask functions locally',
        lifecycleEvents: ['start'],
        options: {
          port: {
            usage: 'Port to listen to. Defaults to 3000',
            shortcut: 'p'
          }
        }
      }
    }

    this.hooks = {
      'wt-local:start': this.serve.bind(this)
    }
  }

  serve() {
    const fnNames = this.serverless.service.getAllFunctions();
    const fnHandlers = {};

    fnNames.forEach((fnName) => {
      const wtfn = this.serverless.service.getFunction(fnName);
      const handler = require(this.serverless.config.servicePath + '/' + wtfn.handler);
      fnHandlers[wtfn.name] = Runtime.createHandler(handler, {});
    });

    const serverPort = this.options.port || 3000;
    const server = http.createServer(createRequestHander(fnHandlers));

    server.listen(serverPort, (err) => {
      if (err) {
        console.error(err);
      }
      console.log('Server is listening on port ' + serverPort);
    });
  }
}

module.exports = WebtasksLocal;
