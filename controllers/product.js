const Product = require('../models/product')

exports.count = function(req, res) {
    // TODO: add logic for counting products
    Product.countDocuments({}, function (err, count) {
        console.log(count)
        res.render('product-count', {count})
    })
}