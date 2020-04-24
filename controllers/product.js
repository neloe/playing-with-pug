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
    Product.findOne({pid: req.params.productID}, function(err, product) {
        let imgsrc = product.imgsrc || 'images/cool-s.png'
        if (product)
            res.render('product-read',{title: product.name, name: product.name, price: product.price, imgsrc:imgsrc})
        else
            res.render('index', {title:'Error'})
    })
}

exports.create = function(req, res) {
    console.log(req.body)
    //res.render('index', {})
    Product.findOne().sort('-pid').exec(function (err, prod)
    {
        console.log(prod.pid)
        let newProduct = new Product({name: req.body.name, price: req.body.price, pid: prod.pid+1})
        newProduct.save(function(err) {
            res.redirect('/products/'+prod.pid+1)
            //res.render('product-read', {title:'Add successful', name: req.body.name, price:req.body.price})
        })
        //res.render('index', {title: prod.pid})
    })
}

exports.product_form = function(req, res) {
    res.render('product-form', {title: 'New Product'})
}