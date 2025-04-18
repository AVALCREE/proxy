const express = require('express');
const request = require('request');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Proxy route that rewrites all relative assets
app.get('/proxy', (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send('Missing url parameter');

  request({ url: targetUrl, headers: { 'User-Agent': 'Mozilla/5.0' } })
    .on('error', err => res.status(500).send('Error loading URL'))
    .pipe(res);
});

app.use('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Proxy Home</title></head>
      <body style="background: black; color: white; font-family: monospace; text-align: center;">
        <h1>✅ Proxy is working</h1>
        <p>Use the format:</p>
        <code>/proxy?url=https://example.com</code>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
