"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

var _logger = _interopRequireDefault(require("./util/logger"));

var _morgan = _interopRequireDefault(require("morgan"));

var _index = _interopRequireDefault(require("./routes/index"));

var _users = _interopRequireDefault(require("./routes/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//instantiate express and set enginne level contexts
var app = (0, _express["default"])();
app.set('view engine', 'hbs');
app.engine('hbs', (0, _expressHandlebars["default"])({
  extname: 'hbs',
  defaultView: 'basic'
})); //end instatiatioonn
//set filestream for server access log.  note dev logs use the logger util

var accessLogStream = _fs["default"].createWriteStream(_path["default"].join(__dirname, '../logs/access.log'), {
  flags: 'a'
}); //set up pre request handler miiddleware calls


app.use((0, _morgan["default"])('combined', {
  stream: accessLogStream
}));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])()); //base static directory is

app.use(_express["default"]["static"](__dirname + '/public')); // handle request routing

app.use('/', _index["default"]);
app.use('/users', _users["default"]); //start server

var server = app.listen(8088, function () {
  _logger["default"].log({
    level: 'info',
    'message': 'simple express server started on 8088'
  });
});