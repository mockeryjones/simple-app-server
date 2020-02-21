"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _logger = _interopRequireDefault(require("../util/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();
/* GET home page. */


router.get('/', function (req, res, next) {
  _logger["default"].log({
    level: 'info',
    'message': '/ called'
  });

  res.cookie('name', 'express').render('basic', {
    layout: 'basic',
    message: 'hi there!'
  });
});
router.get('/home', function (req, res, next) {
  _logger["default"].log({
    level: 'info',
    'message': '/ called'
  });

  res.cookie('name', 'express').render('basic', {
    layout: 'red',
    message: 'hi there!'
  });
});
router.get('/alt', function (req, res, next) {
  _logger["default"].log({
    level: 'info',
    'message': '/ called'
  });

  res.cookie('name', 'express').render('red', {
    layout: 'basic',
    message: 'hi there!'
  });
});
router.get('/althome', function (req, res, next) {
  _logger["default"].log({
    level: 'info',
    'message': '/ called'
  });

  res.cookie('name', 'express').render('red', {
    layout: 'red',
    message: 'hi there!'
  });
});
var _default = router;
exports["default"] = _default;