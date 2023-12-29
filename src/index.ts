import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

const app = express();

// Proxy middleware configuration for HTTP requests
const figmaProxy = createProxyMiddleware({
  target: 'https://www.figma.com',
  changeOrigin: true,
  secure: true, // Disable SSL verification (for testing purposes)
  ws: true, // Enable WebSocket proxying
  headers: {
    // Add any headers needed for the Figma website
    // 'User-Agent': 'Your User Agent String'
  },
  onProxyReq: (proxyReq, req, res) => {
    // Modify or add headers if needed
    // proxyReq.setHeader('Header-Name', 'Header-Value');
  },
  pathRewrite: {
    // Rewrite paths if needed
    // '/old-path': '/new-path',
  },
  onError: (err, req, res) => {
    // Handle errors if needed
    console.error('Proxy error:', err);
    res.status(500).send('Proxy Error');
  },
  onProxyRes: (proxyRes, req, res) => {
    // Modify the proxy response if needed
    // For example, you can modify headers or content
    // proxyRes.headers['X-Modified-Header'] = 'Modified';
  },
});

// Use the Figma proxy for all routes
app.use('*', figmaProxy);


// Start the server
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Proxy server is listening on port ${PORT}`);
});
