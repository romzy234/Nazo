var express = require('express');
var router = express.Router();
const passport = require('passport');
const controller = require('../controllers/index')
const checkAuth = require('../middleware/checkAuth')
const finishAuth = require('../middleware/finishAuth')

/* 
GET home page. 
*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', controller.index);
router.get('/home', checkAuth,finishAuth,controller.getHome);
router.get('/login', controller.getLogin);
router.get('/signup', controller.getSignUp);
router.post('/signup', controller.postSignUp);
router.get('/verifyphone/:id/:code', controller.getVerifyPhone);
router.post('/verifyphone/', controller.postVerifyPhone);
router.post('/done', controller.postDone);

router.get('/settings', checkAuth,finishAuth,controller.getSettings);
router.get('/banking', checkAuth,finishAuth,controller.getBanking);
router.get('/backing', checkAuth,finishAuth,controller.getbacking);
router.get('/backings', checkAuth,finishAuth,controller.getBackings);
router.get('/myinvestment', checkAuth,finishAuth,controller.getInvestMents);
router.get('/loans', checkAuth,finishAuth,controller.getLoans);
router.get('/transfer', checkAuth,finishAuth,controller.gettranfer);
router.post('/transfer', checkAuth,finishAuth,controller.postTransfer);
router.get('/loan', checkAuth,finishAuth,controller.getLoan);
router.get('/transactions', checkAuth,finishAuth,controller.getTransactions);
router.post('/loan', checkAuth,finishAuth,controller.postLoan);
router.get('/all', checkAuth,finishAuth,controller.getAll);
router.get('/rip', checkAuth,finishAuth,controller.getDelUser);

router.get('/notifications', checkAuth,finishAuth,controller.getNotification);
router.get('/transaction-detail/:id', checkAuth,finishAuth,controller.getTransactionD);

router.get('/forgot', controller.getForgot);
router.post('/forgot', controller.postForgot);




router.post('/login',passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/home' }));

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/login');
});


module.exports = router;
