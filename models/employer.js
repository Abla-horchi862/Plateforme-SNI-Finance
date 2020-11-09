const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    position: String,
    salary: Number,
    address: String,
    tel: Number,
    email: String


});

module.exports = mongoose.model('Employer', productSchema);