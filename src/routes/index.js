import express from 'express';
import logger from '../util/logger';

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  logger.log({level: 'info', 'message': '/ called'});
  res.cookie('name', 'express').render('basic', {layout: 'basic', message: 'hi there!'});
});

router.get('/home', function(req, res, next) {
  logger.log({level: 'info', 'message': '/ called'});
  res.cookie('name', 'express').render('basic', {layout: 'red', message: 'hi there!'});
});

router.get('/alt', function(req, res, next) {
  logger.log({level: 'info', 'message': '/ called'});
  res.cookie('name', 'express').render('red', {layout: 'basic', message: 'hi there!'});
});

router.get('/althome', function(req, res, next) {
  logger.log({level: 'info', 'message': '/ called'});
  res.cookie('name', 'express').render('red', {layout: 'red', message: 'hi there!'});
});

export default router;
