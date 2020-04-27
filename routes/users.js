var express = require('express');
var router = express.Router();

userController = require('../controllers/userController')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('registration', {title: 'New User'})
})

router.post('/register', userController.register)

module.exports = router;
