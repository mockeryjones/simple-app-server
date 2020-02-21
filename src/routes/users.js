import express from 'express'
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.sendFile('./public/junk.txt', {
     root: '.'
   });
});

export default router;
