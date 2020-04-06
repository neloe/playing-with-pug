exports.bootstrap = function(req, res, next) {
    res.render('bootstrap', {title: 'Bootstrap', mylist: [1,2,3,4]})
}