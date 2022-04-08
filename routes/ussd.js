var express = require('express');
var router = express.Router();
const controller = require('../controllers/ussd')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', controller.postCall)

module.exports = router;
