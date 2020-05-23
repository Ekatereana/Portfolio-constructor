'use strict';

const Koa = require('koa');
const path = require('path');
const koaBody = require('koa-body');
const session = require('koa-session');
const Logger = require('koa-logger');
const passport = require('koa-passport');
const koaCors = require('koa-cors');
const BASE_PATH = '/backend/server/';
// authentication
require(path.join(__dirname, BASE_PATH, '/auth'));
const koaOptions = {
  origin: true,
  credentials: true
};

// const authRoutes = require(path.join(__dirname, BASE_PATH, 'routers/auth'));
const homeRoute = require(path.join(__dirname, BASE_PATH, '/routers/home'));
const authRoute = require(path.join(__dirname, BASE_PATH, '/routers/auth'));
const mainRoute = require(path.join(__dirname, BASE_PATH, '/routers/main'));
const testRoute = require(path.join(__dirname, BASE_PATH, '/routers/test'));
const updateRoute = require(path.join(__dirname, BASE_PATH, '/routers/update'));
const uploadRoute = require(path.join(__dirname, BASE_PATH, '/routers/upload'));

const app = new Koa();

// sessions settings
app.keys = [process.env.KEY_A, process.env.KEY_H];
app.use(koaCors(koaOptions));
app.use(session({ faildWithErrors: true, session: true }, app));
app.use(koaBody({ multipart: true }));

app.use(passport.initialize());
app.use(passport.session());

// to use all routes that include in basic router
app.use(homeRoute.routes())
  .use(mainRoute.routes())
  .use(testRoute.routes())
  .use(authRoute.routes())
  .use(updateRoute.routes())
  .use(uploadRoute.routes())
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
