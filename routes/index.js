var express = require('express');
var router = express.Router();
const controller = require('../controllers/index')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', controller.index);
router.get('/home', controller.getHome);
router.get('/login', controller.getLogin);
router.get('/signup', controller.getReg);
router.get('/sms-verfication', controller.index);
router.get('/forget', controller.index);


module.exports = router;
