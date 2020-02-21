"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _winston = _interopRequireDefault(require("winston"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var logger = _winston["default"].createLogger({
  level: 'info',
  format: _winston["default"].format.json(),
  defaultMeta: {
    service: 'dev-logging'
  },
  transports: [new _winston["default"].transports.File({
    filename: '../logs/error.log',
    level: 'error'
  }), new _winston["default"].transports.File({
    filename: '../logs/combined.log'
  }), new _winston["default"].transports.Console({
    level: 'info'
  })]
});

var _default = logger;
exports["default"] = _default;