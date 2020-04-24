const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, default: 0.0},
    imgsrc: {type: String},
    pid: {type: Number, required: true}
})

module.exports = mongoose.model('Product', productSchema)
// expected collection name: products