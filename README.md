# Serverless Webtasks Local

Serverless framework plugin that provides a http server to simulate the webtask platform.

The plugin will read your serverless config and provide an endpoint for each function defined.

See [serverless-webtasks-local-example](https://github.com/garethhunt/serverless-webtasks-local-example) for an example project.

## To install

    $ yarn add -D serverless-webtasks-local
		- or -
    $ npm install -D serverless-webtasks-local

## serverless config

```
service:
  name: <your-service-name>

provider:
  name: webtasks
  profile: <your-webtask-profile-name>

functions:
  hello:
    handler: src/hello.js
    name: hello

plugins:
  - '@webtask/serverless-webtasks'
  - 'serverless-webtasks-local'
```

## To run the server

    $ sls wt-local

## In your browser

    http://localhost:3000/hello