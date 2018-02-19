import 'ignore-styles';
import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Wrapper from '../src/components/app/wrapper';

const PORT = 3000;

function handleRender(req, res) {
  // Renders our Hello component into an HTML string
  const html = ReactDOMServer.renderToString(<Wrapper />);

  // Load contents of index.html
  fs.readFile('./src/index.html', 'utf8', function (err, data) {
    if (err) throw err;

    // Inserts the rendered React HTML into our main div
    let document = data.replace(/<title>React Task1<\/title>/, `<title>React Task1</title><link href="/build/main.css" rel="stylesheet">`);
    document = document.replace(/<div id="app"><\/div>/, `<div id="app">${html}</div><script type="text/javascript" src="/build/blogs.js"></script>`);

    // Sends the response back to the client
    res.send(document);
  });
}

const app = express();

// Serve built files with static files middleware
app.use('/build', express.static(path.join(__dirname, '../build')));

// Serve requests with our handleRender function
app.get('*', handleRender);

// Start server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`); // eslint-disable-line no-console
});