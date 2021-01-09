const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: false
    },
    createdDate: {
        type: Date,
        required: false,
        default: Date.now
    }
});

module.exports = mongoose.model('customer', customerSchema);