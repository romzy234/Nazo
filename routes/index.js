var express = require('express');
var router = express.Router();
const passport = require('passport');
const controller = require('../controllers/index')
const checkAuth = require('../middleware/checkAuth')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', controller.index);
router.get('/home', checkAuth,controller.getHome);
router.get('/login', controller.getLogin);
router.get('/signup', controller.getSignUp);
router.post('/signup', controller.postSignUp);
router.get('/verifyphone/:id/:code', controller.getVerifyPhone);
router.post('/verifyphone/', controller.postVerifyPhone);

router.get('/forget', controller.index);




router.post('/login',passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/home' }));

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/users');
});


module.exports = router;
