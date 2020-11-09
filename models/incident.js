const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    type: String,
    department: String,
    employer: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer', required: true },
    status: String,
    description: String
});

module.exports = mongoose.model('Incident', productSchema);