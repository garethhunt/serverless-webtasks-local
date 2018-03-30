'use strict';

const http = require('http');
const Runtime = require('webtask-runtime');
const url = require('url')

const pathRe = /\/([\w-]+)\/?/;

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
    const handlers = {};

    fnNames.forEach((fnName) => {
      const wtfn = this.serverless.service.getFunction(fnName);
      const handler = require(this.serverless.config.servicePath + '/' + wtfn.handler);
      handlers[wtfn.name] = Runtime.createHandler(handler, {});
    });

    const requestHandler = (req, res) => {
      const urlPath = url.parse(req.url).pathname;
      const reResult = urlPath.match(pathRe);

      if (reResult[1] && handlers[reResult[1]]) {
        return handlers[reResult[1]](req, res);
      }

      // Return 404 for any URLs that do not match a defined function name
      console.error(`${urlPath} not found`);
      res.writeHead(404, "Not Found");
      res.end();
    };

    const serverPort = this.options.port || 3000;
    const server = http.createServer(requestHandler);

    server.listen(serverPort, (err) => {
      if (err) {
        console.error(err);
      }
      console.log('Server is listening on port ' + serverPort);
    });
  }
}

module.exports = WebtasksLocal;
