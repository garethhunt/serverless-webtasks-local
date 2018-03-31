const url = require('url');
const pathRe = /\/([\w-]+)\/?/;

const createRequestHandler = (fnHandlers) => {
  return (req, res) => {
    const urlPath = url.parse(req.url).pathname;
    const reResult = urlPath.match(pathRe);

    if (reResult && reResult[1] && fnHandlers[reResult[1]]) {
      return fnHandlers[reResult[1]](req, res);
    }

    // Return 404 for any URLs that do not match a defined function name
    console.error(`${urlPath} not found`);
    res.writeHead(404, "Not Found");
    res.end();
  };
};

module.exports = createRequestHandler;
