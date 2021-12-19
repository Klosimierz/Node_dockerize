const mongoose = require('mongoose');

const cacheSchema = new mongoose.Schema({
    endpoint: {
        type: String,
        required: true,
    },
    payload: {
        type: Array,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    }
});

const cache = mongoose.model('Cache',cacheSchema);
exports.cache = cache;