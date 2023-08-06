const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    expense: { type: String, required: true },
    description: { type: String, required: true },
    datetime: { type: Date, required: true },
    user: { type: mongoose.SchemaTypes.ObjectId },
});

module.exports = mongoose.model('Transaction', TransactionSchema);