import 'ignore-styles';
import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import configureStore from '../src/redux/store/Store';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import routes from '../src/routes/routes';

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const flash = require('connect-flash')

const rest = require('./routes/rest');
const passportLocal = require('./routes/passportLocal');

const PORT = 3000;

const app = express();

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:8081'
];

app.use(cors({
  //origin: 'http://localhost:8081',
  origin: true,
  credentials:true
}));

/*app.use(cors({
  credentials: true,
  origin: function(origin, callback){

    // allow requests with no origin
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);

    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
          'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }

    return callback(null, true);
  }
}));*/

require('./passport/localStrategy')(passport); // pass passport for configuration

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// required for passport
app.use(session({
  secret: 'SECRET',
  resave: true,
  saveUninitialized: true,
  cookie : { secure : false, maxAge : (4 * 60 * 60 * 1000) }, // 4 hours
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

app.set('json spaces', 40);

// Serve built files with static files middleware
app.use('/build', express.static(path.join(__dirname, '../build')));

app.use('/api/blogs', rest);

app.use('/api', passportLocal);

// Serve requests with our handleRender function
//app.get('*', handleRender);

app.get('*', (req, res) => {
  // Create a new Redux store instance
  const store = configureStore();

  const branch = matchRoutes(routes, req.path);

  const promises = branch.map(({ route, match }) => {
    const { fetchData } = route.component;
    return fetchData instanceof Function ?
        fetchData(store.dispatch, match, req.url) :
        Promise.resolve(null);
  });

  return Promise.all(promises).then(() => {
    const context = {};
    const appWithRouter = (
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            { renderRoutes(routes) }
          </StaticRouter>
        </Provider>
    );

    const html = ReactDOMServer.renderToString(appWithRouter);

    if (context.url) {
      res.redirect(context.url);
      return;
    }

    // Grab the initial state from our Redux store
    const preloadedState = store.getState();

    handleRender(res, preloadedState, html);
  });
});

function handleRender(res, preloadedState, html) {
  // Renders our Hello component into an HTML string
  //const html = ReactDOMServer.renderToString(<Wrapper />);
  // Load contents of index.html
  fs.readFile('./src/index.html', 'utf8', function (err, data) {
    if (err) throw err;

    // Inserts the rendered React HTML into our main div
    let document = data.replace(/<title>React Task1<\/title>/, `<title>React Task1</title><link href="/build/main.css" 
        rel="stylesheet">`);
    document = document.replace(/<div id="app"><\/div>/, `<div id="app">${html}</div>
        <script type="text/javascript" src="/build/blogs.js"></script>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
    `);

    // Sends the response back to the client
    res.status(200).send(document);
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`); // eslint-disable-line no-console
});