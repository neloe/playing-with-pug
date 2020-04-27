const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchmea = new Schema({
    username: {type: String, required: true},
    pwhash: {type: String, required: true}
})

module.exports = mongoose.model('User', userSchmea)