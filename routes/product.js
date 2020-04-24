var express = require('express');
var router = express.Router();

const product_controller = require('../controllers/product')

//change to use controller
router.get('/count', product_controller.count)
router.get('/testview', product_controller.testview)

// CRUD
//CREATE
router.get('/newProduct', product_controller.product_form)
router.post('/newProduct', product_controller.create)

//READ
// router.get('/', product_controller.list_all)
router.get('/:productID', product_controller.view_one)

//UPDATE
// router.post('/:productName', product_controller.update_one)
// router.put('/:productName', update controller)

//DELETE
// router.delete('/:productName', product_controller.delete_one)



module.exports = router;
