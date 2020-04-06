var express = require('express');
var router = express.Router();

const bootstrap_controller = require('../controllers/bootstrap')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//change to use controller
router.get('/bootstrap', bootstrap_controller.bootstrap)

module.exports = router;
