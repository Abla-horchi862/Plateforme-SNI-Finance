const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    fournisseur: String,
    number: Number,
    status: String
});

module.exports = mongoose.model('Product', productSchema);