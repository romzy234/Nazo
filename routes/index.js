var express = require('express');
var router = express.Router();
const controller = require('../controllers/index')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', controller.index);
router.get('/login', controller.index);
router.get('/signup', controller.index);
router.get('/sms-verfication', controller.index);
router.get('/forget', controller.index);
router.get('/', controller.index);
router.get('/', controller.index);
router.get('/', controller.index);
router.get('/', controller.index);
router.get('/', controller.index);
router.get('/', controller.index);
router.get('/', controller.index);
router.get('/', controller.index);

module.exports = router;
