exports.auth_req = function(req, res, next) {
    if (!req.isAuthenticated()) res.redirect('/login')
    next()
}