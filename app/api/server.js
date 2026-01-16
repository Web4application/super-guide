const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();

// Config
const HTTP_PORT = 8000;
const HTTPS_PORT = 8443;
const certOptions = {
  key: fs.readFileSync(path.join(__dirname, 'certs/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'certs/cert.pem'))
};

// Redirect HTTP -> HTTPS
const redirectApp = express();
redirectApp.use((req, res) => {
  const host = req.headers.host.replace(/:\d+$/, `:${HTTPS_PORT}`);
  res.redirect(`https://${host}${req.url}`);
});
http.createServer(redirectApp).listen(HTTP_PORT, () => {
  console.log(`HTTP -> HTTPS redirect on http://localhost:${HTTP_PORT}`);
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/index.php', (req, res) => res.send('<?php echo "Index PHP page"; ?>'));
app.get('/phpmyadmin', (req, res) => res.send('<h1>phpMyAdmin placeholder</h1>'));

// Start HTTPS
https.createServer(certOptions, app).listen(HTTPS_PORT, () => {
  console.log(`HTTPS server running at https://localhost:${HTTPS_PORT}`);
});
