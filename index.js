'use strict';

const http = require('http');

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
    const requestHandler = (req, res) => {
      console.log(req.url);
      res.end('Done');
    };

    const server = http.createServer(requestHandler);

    server.listen(3000, (err) => {
      if (err) {
        console.error(err);
      }
      console.log('Server is listening on port 3000');
    });

    console.log('Running server');
  }
}

module.exports = WebtasksLocal;
