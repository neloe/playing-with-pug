const User = require('../models/userModel')
const bcrypt = require('bcryptjs')

exports.register = function(req, res) {
    bcrypt.hash(req.body.pw, 8, function(err, hash) {
        console.log(err)
        newUser = new User({username: req.body.username, pwhash: hash})
        newUser.save(function(err) {
            console.log(err)
            res.redirect('/')
        })
    })
}