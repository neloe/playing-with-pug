var express = require('express');
var router = express.Router();

const product_controller = require('../controllers/product')

//change to use controller
router.get('/count', product_controller.count)
router.get('/testview', product_controller.testview)

module.exports = router;
