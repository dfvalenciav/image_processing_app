'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function trafficMiddleware(req, res, next) {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  console.log(`[${timestamp}] ${method} ${url}`);
  next();
}
exports.default = trafficMiddleware;
