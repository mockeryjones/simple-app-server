import express from 'express';
import path from 'path';
import fs from 'fs';
import cookieParser from 'cookie-parser';
import hbs from 'express-handlebars';
import logger from './util/logger';
import morgan from 'morgan';

import modelRouter from './routes/model';
import reactRouter from './routes/react-router';

import isModelHelper from './handlebars-helpers/is-model-type';


//instantiate express and set enginne level contexts
const app = express();

console.log('partials ' + path.join(__dirname,  'views/partials'));
console.log('layouts ' + path.join(__dirname,  'views/layouts'));
console.log('public ' + __dirname + '/public');
console.log('views ' + path.join(__dirname,  'views'));
console.log('logs ' + path.join(__dirname, '../logs/access.log'));

let hbs_engine = hbs( {
  extname: 'hbs',
  defaultView: 'basic',
  layoutsDir: path.join(__dirname,  'views/layouts'),
  partialsDir: path.join(__dirname,  'views/partials')
});


app.set('views', path.join(__dirname,  'views'));
app.engine( 'hbs', hbs_engine);
app.set('view engine', 'hbs');


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
app.use('/model', modelRouter);
app.use('/react-model', reactRouter);

export default app;
