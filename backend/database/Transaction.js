const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    expense: { type: String, required: true },
    description: { type: String, required: true },
    datetime: { type: Date, required: true },
});

const TransactionModel = mongoose.model('Transaction', TransactionSchema);

module.exports = { TransactionModel };