const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
  app.use(
    '/auth',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
  // Proxy ChargeHub API requests to avoid CORS in development
  app.use(
    '/chargehub',
    createProxyMiddleware({
      target: 'https://apiv3.chargehub.com',
      changeOrigin: true,
      pathRewrite: {
        '^/chargehub': '',
      },
      secure: false,
    })
  );
};
