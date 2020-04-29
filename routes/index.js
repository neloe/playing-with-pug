var express = require('express');
var router = express.Router();

const bootstrap_controller = require('../controllers/bootstrap')
const passport = require('passport')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//change to use controller
router.get('/bootstrap', bootstrap_controller.bootstrap)

router.get('/login', function(req, res, next){
  res.render('login', {title: 'Sign In'})
})

router.post('/login', 
            // try to authenticate; on failure redirect back to /login
            passport.authenticate('local', {failureRedirect: '/login'}),
            // if authentication succeeds, run this function
            function(req, res) {
              res.redirect('/')
})

router.get('/testlogin', function(req, res) {
  console.log(req.isAuthenticated())
  if (req.isAuthenticated())
  {
    console.log(req.user)
    res.render('index', {title: 'Authenticated'})
  }
  else
    res.render('index', {title: 'Not Authenticated'})
})

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/')
})

module.exports = router;
