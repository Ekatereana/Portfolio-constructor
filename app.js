'use strict';

const Koa = require('koa');
const path = require('path');
const fs = require('fs');
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

const authRoute = require(path.join(__dirname, BASE_PATH, '/routers/auth'));
const testRoute = require(path.join(__dirname, BASE_PATH, '/routers/test'));
const updateRoute = require(path.join(__dirname, BASE_PATH, '/routers/update'));
const uploadRoute = require(path.join(__dirname, BASE_PATH, '/routers/upload'));
// const deployRoute = require(path.join(__dirname, BASE_PATH, '/routers/deploy'));

const app = new Koa();

const serve = require('koa-static');
app.use(serve(path.join(__dirname, '/frontend/build')));
app.use(serve(path.join(__dirname, '/frontend/public')));

// sessions settings
app.keys = [process.env.KEY_A, process.env.KEY_B];
app.use(koaCors(koaOptions));
app.use(session({ failedWithErrors: true, session: true }, app));
app.use(koaBody({ multipart: true }));

app.use(passport.initialize());
app.use(passport.session());

// to use all routes that include in basic router
app.use(testRoute.routes())
  .use(authRoute.routes())
  .use(updateRoute.routes())
  .use(uploadRoute.routes());
// to parse request body
// to log all info
app.use(Logger());

const Router = require('koa-router');
const router = new Router();

router.get('/*', function (ctx) {
  ctx.body = fs.readFileSync(path.join(__dirname, '/frontend/build', '/index.html'), 'utf8');
});

app.use(router.routes());
app.use(router.allowedMethods());

const port = process.env.PORT || 4000;

const server = app.listen(port, function () {
  console.log(`Start portfolio-constructor server on ${port}!`);
});

module.exports = server;
