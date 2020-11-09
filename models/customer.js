const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    address: String,
    company: String,
    tel: Number,
    email: String
});

module.exports = mongoose.model('Customer', productSchema);