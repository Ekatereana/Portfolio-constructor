'use strict';

const Koa = require('koa');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const Logger = require('koa-logger');
const passport = require('koa-passport');
const BASE_PATH = '/backend/server/';

// authentication
require(path.join(__dirname, BASE_PATH, '/auth'));
// const authRoutes = require(path.join(__dirname, BASE_PATH, 'routers/auth'));
const homeRoute = require(path.join(__dirname, BASE_PATH, '/routers/home'));
const authRoute = require(path.join(__dirname, BASE_PATH, '/routers/auth'));
const mainRoute = require(path.join(__dirname, BASE_PATH, '/routers/main'));
const testRoute = require(path.join(__dirname, BASE_PATH, '/routers/test'));

const app = new Koa();

// sessions settings
app.keys = [process.env.KEY_A, process.env.KEY_H];
app.use(session({}, app));
app.use(bodyParser());

app.use(passport.initialize());
app.use(passport.session());

// to use all routes that include in basic router
app.use(homeRoute.routes())
  .use(mainRoute.routes())
  .use(testRoute.routes())
  .use(authRoute.routes())
// to serve up compiled React app
  .use(require('koa-static')('./build'));
// to parse request body
// to log all info
app.use(Logger());

const port = process.env.PORT || 4000;

const server = app.listen(port, function () {
  console.log(`Start portfolio-constructor server on ${port}!`);
});

module.exports = server;
