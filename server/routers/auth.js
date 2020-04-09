'use strict';

import _regeneratorRuntime from 'babel-runtime/regenerator';

var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Router = require('koa-router');
var passport = require('koa-passport');
// to create read stream
// const fs = require('fs')
var queries = require('../db/queries/users');

var router = new Router();

// registration part
router.get('/auth/register', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(ctx) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ctx.type = 'html';
            // we don`t have react-views yet
            // ctx.body = fs.createReadStream('./src/server/views/sth')

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

router.post('/auth/register', function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(ctx) {
    var user;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return queries.addUser(ctx.request.body);

          case 2:
            user = _context2.sent;
            return _context2.abrupt('return', passport.authenticate('local', function (err, info, status) {
              if (err) {
                console.log(err.stack);
              } else {
                if (user) {
                  ctx.login(user);
                  ctx.redirect('/home');
                  ctx.type = 'application/json';
                } else {
                  ctx.status = 400;
                  ctx.body = { status: 'error' };
                }
              }
            })(ctx));

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}());

// login part
router.get('/auth/login', function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(ctx) {
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!ctx.isAuthentificated()) {
              ctx.type = 'application/json';
              ctx.redirect('/auth/register');
              // there should be some react login view
              // ctx.body = .....
            } else {
              ctx.redirect('/home');
            }

          case 1:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  }));

  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}());

router.post('/auth/login', function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(ctx) {
    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt('return', passport.authenticate('local', function (err, user, info, status) {
              if (err) {
                console.log(err.stack);
                ctx.status = 400;
              } else {
                if (user) {
                  ctx.login(user);
                  ctx.redirect('/auth/status');
                } else {
                  ctx.status = 400;
                  ctx.body = { status: 'error' };
                }
              }
            })(ctx));

          case 1:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, _this);
  }));

  return function (_x4) {
    return _ref4.apply(this, arguments);
  };
}());

router.get('/auth/logout', function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(ctx) {
    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (ctx.isAuthentificated()) {
              ctx.logout();
              ctx.redirect('/auth/login');
            } else {
              ctx.body = { success: false };
              ctx.throw(401);
            }

          case 1:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, _this);
  }));

  return function (_x5) {
    return _ref5.apply(this, arguments);
  };
}());

router.get('/home', function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(ctx) {
    return _regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (ctx.isAuthentificated()) {
              ctx.type = 'html';
              // there will be some view
              // ctx.body = fs.createReadStream(...)
            } else {
              ctx.redirect('/auth/login');
            }

          case 1:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, _this);
  }));

  return function (_x6) {
    return _ref6.apply(this, arguments);
  };
}());

module.exports = router;