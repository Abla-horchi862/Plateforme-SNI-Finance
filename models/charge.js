const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    type: String,
    amount: Number,
    department: String,
    status: String,
    description: String


});

module.exports = mongoose.model('Charge', productSchema);