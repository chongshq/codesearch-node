var express = require('express');
var esController = require('../controller/esController')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/q', esController.search);
router.get('/esquery', esController.searchES);
router.get('/lib', esController.getLib);

module.exports = router;
