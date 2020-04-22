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

exports.view_one = function(req, res) {
    Product.findOne({name: req.params.productName}, function(err, product) {
        if (product)
            res.render('product-read',{title: product.name, name: product.name, price: product.price})
        else
            res.render('index', {title:'Error'})
    })
}

exports.create = function(req, res) {
    console.log(req.body)
    //res.render('index', {})
    let newProduct = new Product({name: req.body.name, price: req.body.price})
    newProduct.save(function(err) {
        res.redirect('/products/'+req.body.name)
        //res.render('product-read', {title:'Add successful', name: req.body.name, price:req.body.price})
    })
}

exports.product_form = function(req, res) {
    res.render('product-form', {title: 'New Product'})
}