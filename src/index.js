import express from 'express';
import path from 'path';
import fs from 'fs';
import cookieParser from 'cookie-parser';
import hbs from 'express-handlebars';
import logger from './util/logger';
import morgan from 'morgan';

import indexRouter from './routes/index';
import usersRouter from './routes/users';


//instantiate express and set enginne level contexts
const app = express();
app.set('view engine', 'hbs');
app.engine( 'hbs', hbs( {
  extname: 'hbs',
  defaultView: 'basic'
}));
//end instatiatioonn

//set filestream for server access log.  note dev logs use the logger util
const accessLogStream = fs.createWriteStream(path.join(__dirname, '../logs/access.log'), { flags: 'a' })

//set up pre request handler miiddleware calls
app.use(morgan('combined', { stream: accessLogStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//base static directory is
app.use(express.static(__dirname + '/public'));

// handle request routing
app.use('/', indexRouter);
app.use('/users', usersRouter);





//start server
let server = app.listen(8088, () => {
  logger.log({level: 'info', 'message': 'simple express server started on 8088'});
});
