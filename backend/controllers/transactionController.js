const Transaction = require('../models/transactionModel');

const getTransactions = (req, res) => {
    Transaction.getAllTransactions((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar transações' });
        }
        res.json(results);
    });
};

module.exports = {
    getTransactions,
};
