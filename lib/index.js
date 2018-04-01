'use strict';

const http = require('http');
const configureFunctionHandlers = require('./functionHandlers');
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
    const fnHandlers = configureFunctionHandlers(this.serverless);
    const server = http.createServer(createRequestHander(fnHandlers));
    const serverPort = this.options.port || 3000;

    server.listen(serverPort, (err) => {
      if (err) {
        console.error(err);
      }
      console.log('Server is listening on port ' + serverPort);
    });
  }
}

module.exports = WebtasksLocal;
