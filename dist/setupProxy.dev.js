"use strict";

var _require = require("http-proxy-middleware"),
    createProxyMiddleware = _require.createProxyMiddleware;

module["export"] = function (app) {
  app.use();
  createProxyMiddleware('/api/animals', {
    target: 'http://localhost:8000',
    changeOrigin: true
  });
};