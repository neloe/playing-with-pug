const Product = require('../models/product')

exports.count = function(req, res) {
    // TODO: add logic for counting products
    Product.countDocuments({}, function (err, count) {
        console.log(count)
        res.render('product-count', {count})
    })
}

exports.testview = function(req, res) {
    Product.findOne({name: 'product1'}, function(err, product) {
        console.log(product)
        res.render('product-read',{title: product.name, name: product.name, price: product.price})
    })
}